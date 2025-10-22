import { createContext, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import profileIcon from "../assets/images/profile-icon-9.png";
import axios from "axios";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
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
      // const response = await axios.get(`http://localhost:5000/auth/users?email=${newuser.email}`)
      // if (response.data.length > 0) {
      //   toast.error("Email id Already Exists")
      // } else {

        const userData = { ...newuser
          // image: profileIcon, role: "user", isAuthenticated: true, cart: [], wishlist: [], shippingAddress: [], orders: []
         }

        const Postresponse = await axios.post('http://localhost:5000/auth/signup', newuser)
        console.log(Postresponse.data)
        setUser(userData)
        // localStorage.setItem("user", JSON.stringify(Postresponse.data))
        toast.success("Signup SuccessFull")
        navigate('/login')
      // }

    } catch (err) {
       console.error("Axios signup error:", err.response?.data || err.message);
    }
  }





  const login = async (email, password) => {
    try {
      const loginCredentials={email,password}
      const response = await axios.post(`http://localhost:5000/auth/login`,loginCredentials,{ withCredentials: true })

      if (response.data.length === 0) {
        toast.error("The UserName or Password doesn't Match")
      }
      
      if (!response.data.user.isAuthenticated) {
        toast.error("You Have Been Blocked By Admin")
      } else {
        setUser(response.data.user)


        // localStorage.setItem("role", response.data.user.role)

        // if (response.data.user.role === "user") {
          const localStorageLoginData = { isAuthenticated: true, id: response.data.user._id, username: response.data.user.username, email: response.data.user.email }
          localStorage.setItem("user", JSON.stringify(localStorageLoginData))

          navigate("/")
        // } else {
          // navigate("/admin/dashboard")
        // }
        toast.success("Logined Successfully")

      }
    } catch (err) {
      console.error("Axios login error:", err.response?.data || err.message);
    }
  }


  //______Editing___user_______


const updateUser=(userData)=>{
  console.log(userData)
}



  const logout = () => {
    const log_out = confirm("Are You Sure !")
    if (log_out) {
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("role")
      navigate('/')
    }

  }



  //______Admin___Side

  const toggleUser = async (id, Authenticated) => {
    if (user.id == id) {
      setUserAuthenticated(Authenticated)//toggled value
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("role")
    }
    await Axios_instance.patch(`/users/${id}`, { isAuthenticated: Authenticated });
  }

  const adminLogout=()=>{
    toast.success("Log out Successfully")
    localStorage.removeItem("role")
    setUser(null)
    navigate("/login")
  }




  return (<AuthContext.Provider value={{ user, signup, login, logout, toggleUser,adminLogout,updateUser  }}>
    {children}
  </AuthContext.Provider>)
}