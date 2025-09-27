import React, { useEffect, useState } from "react";

import axios from "axios";
import ResourceCard from "../components/ResourceCard";
import ThemeToggle from "../components/ThemeToggle";
import "./Dashboard.css";

const API_URL="http://localhost:5000/api/resources/resources";

const Dashboard = () => {
      const [resources, setResources] = useState([]);
      const [filter, setFilter] = useState("");
      const [form, setForm] = useState({title:"",description:"",category:"",link:""});
      const [editingId, setEditingId]= useState(null);
      const token = localStorage.getItem('token');
      const authHeader = {headers: {Authorization: `Bearer ${token}`}};

     const fetchResources = async () => {
            try{
                const res = await axios.get(API_URL, authHeader);
                setResources(res.data);

            }catch (error){
             console.error("Error fetching resources:",error);
            }
      };
      useEffect(() => {
            fetchResources();
      }, []);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                if(editingId){
                   await axios.put(`${API_URL}/${editingId}`, form, authHeader);
                }else{
                   await axios.post(API_URL, form, authHeader);
                }
                setForm({title:"",description:"",category:"",link:""});
                setEditingId(null);
                fetchResources();

            }catch (error){
                console.error("Error savingg resource: ", error);
            }
      };

      const handleEdit =(resource)  => {
            setForm ({
                title:resource.title,
                description:resource.description,
                category:resource.category,
                link:resource.link,
            });
            setEditingId(resource._id);
      };

      const handleDelete =async (id) => {
            try{
                await axios.delete(`${API_URL}/${id}`, authHeader);
                fetchResources();

            }catch (error){
                   console.error("Error deleting resours:" , error);
            }
      };

      const categories = [...new Set(resources.map((r)=> r.category))];
      const filteredResources = filter ? resources.filter((r) => r.category === filter) : resources;


      return(
            <div className="container mt-4">
                 <h2 className="mb-3 text-center">Cybersecurity Resources</h2>

                 <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
                       <h5>{editingId ? "Edit Resource " : "Add Resource"}</h5> 
                       <input type="text" className="form-control mb-2" placeholder="Title" value={form.title}
                       onChange={(e) => setForm({...form, title:e.target.value})} required />
                        <textarea className="form-control mb-2" placeholder="Description" value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})} required />
                        <input type="text" className="form-control mb-2" placeholder="Category" value={form.category}
                        onChange={(e) => setForm({...form, category: e.target.value})} required />
                        <input type="url" className="form-control mb-2" placeholder="Link" value={form.link} onChange={(e)=> setForm({...form, link:e.target.value})} required />

                        <div className="mt-3 d-flex gap-2">
                             <button type="submit" className="btn btn-primary btn-sm small-btn-box">{editingId ? "Update Resource" : "Add Resource"}</button>
                             {editingId && (
                                    <button type="button" className="btn btn-secondary btn-sm small-btn-box"
                                    onClick={() => {
                                          setForm({title:"",description:"",category:"",link:""});
                                          setEditingId(null);
                                    }}
                                    >Cancel</button>
                             )}
                        </div>
                        </form>      

                        <div className="mb-3">
                             <select className="form-select w-auto"
                             value={filter} onChange={(e) => setFilter(e.target.value)}>
                                    <option value="">All Categories</option>
                                    {categories.map((cat, i) => (
                                                <option key={i} value={cat}>{cat}</option>
                                    ))}
                             </select>
                                    </div>  

                        {filteredResources.length === 0  ? (
                               <p className="text-muted">No resources found.</p>
                        ) : (
                             <div className="row"> {filteredResources.map((r) =>(
                                    <div key={r._id} className="col-md-6 mb-4">
                                    <ResourceCard resource={r} onEdit={handleEdit} onDelete={handleDelete} />
                                    </div>

                             ))}
                             </div>
                        )}

                        <ThemeToggle />

            </div>
      );
};
export default Dashboard;