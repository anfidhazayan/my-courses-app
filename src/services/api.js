import axios from "axios";

const api = axios.create({
    baseURL: "https://my-courses-api-2.onrender.com"
});

export default api;