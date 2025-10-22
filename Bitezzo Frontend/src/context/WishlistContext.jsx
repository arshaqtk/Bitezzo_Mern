
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const WishListContext = createContext()
export const WishlistProvider = ({ children }) => {
    const navigate = useNavigate();

    const [wishlistToggle, setWishListToggle] = useState(false)
    const [wishlistItems, setWishListItems] = useState([])
    const { user } = useContext(AuthContext)

    async function fetchWishListData() {
        // if (user.id) {
            try {
                const { data } = await axios.get(`http://localhost:5000/wishlist/`, { withCredentials: true })

                const wishlist = data.wishlist

                setWishListItems(wishlist)

            } catch (err) {
              console.log( err.response?.data || err.message)
            }
        // }
    }
    useEffect(() => {
        fetchWishListData()
    }, [])

    const addToWishlist = async ({ productId }) => {
        setWishListToggle(!wishlistToggle)
        // if (!user.id) {
        //     toast.error("Login First")
        //     return
        // }

        try {

            // if (user.id) {
            const { data } = await axios.get(`http://localhost:5000/wishlist/`, { withCredentials: true })

            const wishlist = data.wishlist
            console.log(wishlist)

            if (wishlist.find((item) => item.product._id == productId)) {
                const { data } = await axios.patch(`http://localhost:5000/wishlist/update`, { productId }, { withCredentials: true })
                const updatedWishlist = data.wishlist
                setWishListItems(updatedWishlist)
                toast.success("removed")

            } else {
                const response = await axios.post(`http://localhost:5000/wishlist/add`, { productId }, { withCredentials: true })
                console.log(response)
                toast.success("Wishlist Added")
            }

            // }



        } catch (err) {
            console.log( err.response?.data || err.message)
        }
    }


    const removeWishlist = async (productId) => {
        setWishListToggle(!wishlistToggle)
        try {

            // if (user.id) {
                // const userResponse = await Axios_instance.get(`users/${user.id}`)
                // const userData = userResponse.data

                // if (userData.wishlist.find((item) => item.productId == productId)) {
                //     const updatedWishlist = userData.wishlist.filter(item => item.productId !== productId);
                //     setWishListItems(updatedWishlist)
                //     await Axios_instance.patch(`/users/${user.id}`, { wishlist: updatedWishlist })
                //     toast.success("removed")
                // }
                const { data } = await axios.patch(`http://localhost:5000/wishlist/update`, { productId }, { withCredentials: true })
                const updatedWishlist = data.wishlist
                setWishListItems(updatedWishlist)
                toast.success("removed")
            // }
        } catch (err) {
            console.log( err.response?.data || err.message)
        }
    }

    return (<WishListContext.Provider value={{ addToWishlist, fetchWishListData, removeWishlist, wishlistItems }}>
        {children}
    </WishListContext.Provider>)
}