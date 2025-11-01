import { createContext, useEffect, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("https://bitezzo-backend.onrender.com", {
  withCredentials: true,
  transports: ["websocket"], // force WebSocket instead of polling
});


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : ""
    } catch {
      return null
    }
  })
  const [userAuthenticated, setUserAuthenticated] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    
    socket.emit("registerUser", auth.id);
    
    socket.on("userBlocked", (data) => {
      console.warn("Blocked by admin:", data.message);

    
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      toast.error("You have been blocked by admin");
      navigate("/login");
      window.location.reload();
    });

     return () => socket.off("userBlocked");
  },[auth.id])


  const signup = async (newuser) => {
    try {
      const Postresponse = await axios.post('https://bitezzo-backend.onrender.com/auth/signup', newuser)
     setAuth(newuser)
      toast.success("Signup SuccessFull")
      navigate('/login')

    } catch (err) {
      console.error("Axios signup error:", err.response?.data || err.message)

       if (err.response?.status === 400) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((errorMsg) => toast.error(errorMsg));
      } else {
        toast.error(errors || "Validation failed");
      }
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    }
  }





  const login = async (email, password) => {
    try {
      const loginCredentials = { email, password }
      const response = await axios.post(`https://bitezzo-backend.onrender.com/auth/login`, loginCredentials, { withCredentials: true })
      console.log(response.data)
      const user =response.data.user
      console.log(user)
      if (response.data.length === 0) {
        toast.error("The UserName or Password doesn't Match")
      }

       
        if(response.status==200) {
          if(response.data.user.isAdmin){
            toast.success("admin")
            navigate("/admin")
          }else{
            toast.success("user")
            navigate("/")
            const localStorageLoginData = {id:user.id, username:user.name, email:user.email,isAdmin:user.isAdmin }
            localStorage.setItem("user", JSON.stringify(localStorageLoginData))
          }
          setAuth({
            id: user.id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: response.data.accessToken,
          });
          localStorage.setItem("accessToken", response.data.accessToken);
          toast.success("Logined Successfully")

        }
      

    } catch (err) {
      if(err.response.status==400){
        toast.error(err.response?.data || "SomeThing went wrong")
      }
      console.error("Axios login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "SomeThing went wrong");
    }
  }



  const logout = () => {
    const log_out = confirm("Are You Sure !")
    if (log_out) {
      setAuth(null)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("user")
    
      navigate('/')
    }
  }



  //______Admin___Side




  const toggleUser = async (id, Authenticated) => {
    if (auth.id == id) {
      setUserAuthenticated(Authenticated)//toggled value
      setAuth(null)
      localStorage.removeItem("user")
      localStorage.removeItem("role")
    }
    await Axios_instance.patch(`/users/${id}`, { isAuthenticated: Authenticated });
  }





  const adminLogout = () => {
    toast.success("Log out Successfully")
    localStorage.removeItem("role")
    setAuth(null)
    navigate("/login")
  }




  return (<AuthContext.Provider value={{ auth, signup, login, logout, toggleUser, adminLogout }}>
    {children}
  </AuthContext.Provider>)
}