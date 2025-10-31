import adminAxiosInstace from "./adminApi"
import toast from "react-hot-toast"



export const getAllProduct=async()=>{
     try{ 
    const {data}=await adminAxiosInstace.get("/products",{},{withCredentials:true})
    console.log(data)
    return data.products

}catch(err){
console.error("Admin product fetch error:", err.response?.data || err.message);
 toast.error(err.response?.data?.message || "Something went wrong");
   }
}

export const softDeleteProduct=async(productId)=>{
    try{
 const {data}=await adminAxiosInstace.patch(`/products/${productId}/soft-delete`,{},{withCredentials:true})
 if(data.success){
    toast.success(data.message)
 }
    return data

    }catch(err){
        console.error("Admin product Deletion error:", err.response?.data || err.message);
         toast.error(err.response?.data?.message || "Something went wrong");
    }
}

export const addProduct=async(formData)=>{
    try{
        const {data}=await adminAxiosInstace.post("/products/add-product",formData,{ headers: { 'Content-Type': 'multipart/form-data' },withCredentials:true})
        if(data.success){
             toast.success(data.message)
        }
        return data
    }catch(err){ console.error("Admin product Deletion error:", err.response?.data || err.message);
         toast.error(err.response?.data?.message || "Something went wrong");}
}


export const editProduct=async(id,formData)=>{
    try{
        const {data}=await adminAxiosInstace.put(`/products/${id}/edit-product`,formData,{ headers: { 'Content-Type': 'multipart/form-data' },withCredentials:true})
        if(data.success){
             toast.success(data.message)
        }
        return data
    }catch(err){ console.error("Admin product Deletion error:", err.response?.data || err.message);
         toast.error(err.response?.data?.message || "Something went wrong");}
}