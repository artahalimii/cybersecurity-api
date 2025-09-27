import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
            const [username, setUsername] = useState("");
            const [password, setPassword] = useState("");
            const [error, setError] = useState("");
            const navigate = useNavigate();

            const handleLogin = async (e) => {
                  e.preventDefault();
                  setError("");
                  try {
                       const res = await axios.post("http://localhost:5000/api/auth/login", {
                         username,
                         password
                       });
                       localStorage.setItem('token', res.data.token);
                       navigate('/dashboard');
                  }catch (err) {
                        setError("Invalid username or password");
                  }
            };

            return (
                    <div className="container mt-5" style={{ maxWidth: "400px"}}>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit = {handleLogin}>
                        <div className="mb-3">
                             <label>Username</label>
                             <input type= "text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}
                             required />

                        </div>
                        <div className="mb-3">
                             <label>Password</label>
                             <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
                             required />

                        </div>
                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                    </div>
            );
};
export default Login;