import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export  const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const adminRole=localStorage.getItem("role")
  console.log(user?.isAdmin)
// if(user&&!user.isAdmin){ 
//   toast.error(user.isAdmin)
//   toast.error("You are already loggined")
//     return <Navigate to="/" replace />
// }else if(adminRole=="admin"){
//   toast.error("You are already loggined")
//    return <Navigate to="/admin/dashboard" replace />
// }
return <Outlet/>
}