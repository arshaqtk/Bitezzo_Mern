import { createContext, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import profileIcon from "../assets/images/profile-icon-9.png";
import axios from "axios";

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



  const signup = async (newuser) => {
    try {
      const Postresponse = await Axios_instance.post('/auth/signup', newuser)
     setAuth(newuser)
      toast.success("Signup SuccessFull")
      navigate('/login')

    } catch (err) {
      console.error("Axios signup error:", err.response?.data || err.message);
    }
  }





  const login = async (email, password) => {
    try {
      const loginCredentials = { email, password }
      const response = await Axios_instance.post(`/auth/login`, loginCredentials, { withCredentials: true })
      console.log(response.data)
      const user =response.data.user
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
            const localStorageLoginData = {id:user._id, username:user.name, email:user.email,isAdmin:user.isAdmin }
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
      console.error("Axios login error:", err.response?.data || err.message);
    }
  }


  //______Editing___user_______


  const updateUser = (userData) => {
    console.log(userData)
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




  return (<AuthContext.Provider value={{ auth, signup, login, logout, toggleUser, adminLogout, updateUser }}>
    {children}
  </AuthContext.Provider>)
}