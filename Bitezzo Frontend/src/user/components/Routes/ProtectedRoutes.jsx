import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export  const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const role=localStorage.getItem("role")
if(role=="admin"){
  toast.error("You dont have access")
    return <Navigate to="/admin/dashboard" replace />
}
else if(!user){
    toast.error("Login First")
    return <Navigate to="/login" replace />
}

    return <Outlet />; 
};
