import axios from "axios";
import { refreshTokenIfRequired } from "./authHelpers";

const Axios_instance = axios.create({
  baseURL: 
  // "https://react-ecommerce-server-m4c6.onrender.com", 
  "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

Axios_instance.interceptors.request.use(async config => {

  await refreshTokenIfRequired(); 

  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default Axios_instance;
