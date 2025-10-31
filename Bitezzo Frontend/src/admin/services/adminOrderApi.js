import adminAxiosInstace from "./adminApi"
import toast from "react-hot-toast"


export const getAllOrders=async()=>{
     try{ 
    const {data}=await adminAxiosInstace.get("/orders",{},{withCredentials:true})
    return data.orders
}catch(err){
console.error("Admin order fetch error:", err.response?.data || err.message);
 toast.error(err.response?.data?.message || "Something went wrong");
   }
}

export const getOrderById=async(orderId)=>{
     try{ 
    const {data}=await adminAxiosInstace.get(`/orders/${orderId}`,{},{withCredentials:true})
    return data.order
}catch(err){
console.error("Admin order fetch error:", err.response?.data || err.message);
 toast.error(err.response?.data?.message || "Something went wrong");
   }
}

export const updateOrderStatus=async(orderId,status)=>{
     try{ 
    const {data}=await adminAxiosInstace.patch(`/orders/${orderId}/status`,{status},{withCredentials:true})
    if(data.success){
         toast.success(data.message)
    }else if(!data.error){
         toast.success(data.message)
    }
}catch(err){
console.error("Admin order fetch error:", err.response?.data || err.message);
 toast.error(err.response?.data?.message || "Something went wrong");
   }
}