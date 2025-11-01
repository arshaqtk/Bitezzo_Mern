import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const refreshTokenIfRequired=async()=>{
    const token =localStorage.getItem("accessToken")
    if(!token) return;
    const {exp}=jwtDecode(token);
    const now= Date.now()/1000;

    if(exp-now<60){
        const response= await axios.post("https://bitezzo-backend.onrender.com/auth/refresh",{},{withCredentials:true})
        localStorage.setItem("accessToken",response.data.accessToken)
    }
}

