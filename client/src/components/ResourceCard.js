import React from "react";
import Button from '@mui/material/Button';

const ResourceCard = ({ resource, onEdit, onDelete}) => (
       <div className="card mb-3 shadow-sm">
            <div className= "card-body">
            <h5 className="card-title">{resource.title}</h5>
            <p className="card-text">{resource.description}</p>
            <span className="badge bg-secondary">{resource.category}</span>

            <br/>
            <br/>
            
            <Button  variant="outlined" href={resource.link} target="_blank" rel="noreferrer"
            sx={{
              fontSize: "0.8rem",
              padding: "4px 12px",
              borderColor: "gray",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover":{
                borderColor: "darkgray",
              },
            }}>🔗 Visit</Button>
            
             <div className="mt-3 d-flex gap-2">
            <button className="btn btn-warning btn-sm " onClick={() => onEdit(resource)}>✏️ Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(resource._id)}>🗑 Delete</button>
            </div>
            </div>
            </div>
);
export default ResourceCard;

