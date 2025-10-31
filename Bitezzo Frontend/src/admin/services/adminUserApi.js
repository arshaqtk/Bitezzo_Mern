import adminAxiosInstace from "./adminApi"
import toast from "react-hot-toast"

export  const getAllUserData=async()=>{
   try{ 
    const {data}=await adminAxiosInstace("/users",{},{withCredentials:true})
    console.log(data)
    return data

}catch(err){
console.error("Admin user fetch error:", err.response?.data || err.message);
   }
}


export const toggleUserAuthentication=async(userId)=>{
    try{
        const {data}=await adminAxiosInstace.patch("/users/toggle-block",{userId},{withCredentials:true})
        toast.success(data.message)
        return data
    }
    catch(err){
        console.error("Admin user toggle error:", err.response?.data || err.message);
       toast.error(err.response?.data?.message || "Something went wrong");
    }
}

export const getUserById=async(id)=>{
    try{
        const {data}=await adminAxiosInstace.get(`/users/${id}`,{},{withCredentials:true})
        return data.user
    }catch(err){console.error("Admin user fetch error:", err.response?.data || err.message);
       toast.error(err.response?.data?.message || "Something went wrong");}
}

export const getUserOrders=async(id)=>{
    try{
        const {data}=await adminAxiosInstace.get(`/users/${id}/order`,{},{withCredentials:true})
        console.log(data)
        return data.order
    }catch(err){console.error("Admin order fetch error:", err.response?.data || err.message);
       toast.error(err.response?.data?.message || "Something went wrong");}
}

export const getUserCart=async(id)=>{
    try{
        const {data}=await adminAxiosInstace.get(`/users/${id}/cart`,{},{withCredentials:true})
        console.log(data)
        return data.cart.items
    }catch(err){console.error("Admin cart fetch error:", err.response?.data || err.message);
       toast.error(err.response?.data?.message || "Something went wrong");}
}