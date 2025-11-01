import axios from "axios"
import { refreshTokenIfRequired } from "../../api/authHelpers";

 const adminAxiosInstace=axios.create({
    baseURL: "https://bitezzo-backend.onrender.com/admin",headers:{ "Content-Type": "application/json"}
})

adminAxiosInstace.interceptors.request.use(async config => {

  await refreshTokenIfRequired(); 

  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const getDashboardStats=async()=>{
    try{
    const response=await adminAxiosInstace.get("/dashboard",{},{ withCredentials: true })
    return response.data
}catch(err){
      console.error("Admin error:", err.response?.data || err.message);
}

}


export default adminAxiosInstace