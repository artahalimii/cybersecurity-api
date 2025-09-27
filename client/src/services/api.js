import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
       baseURL:API_URL,
});

export const loginUser = async (username, password ) =>
            api.post('/auth/login', {username, password});




export default api;