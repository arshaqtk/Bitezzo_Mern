
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const WishListContext = createContext()
export const WishlistProvider = ({ children }) => {

    const [wishlistToggle, setWishListToggle] = useState(false)
    const [wishlistItems, setWishListItems] = useState([])
    const { user } = useContext(AuthContext)

    async function fetchWishListData() {
        // if (user.id) {
        try {
            const { data } = await Axios_instance.get(`/wishlist/`, { withCredentials: true })

            const wishlist = data.wishlist
            console.log(wishlist)
            setWishListItems(wishlist)

        } catch (err) {
            console.log(err.response?.data || err.message)
            toast.error(err.response?.data?.message || "Something went wrong");
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
            // const response = await Axios_instance.get(`/wishlist/`, { withCredentials: true })
            // toast.error("called")
            //     const wishlist = response.data?.wishlist
            //     console.log(wishlist)


            if (wishlistItems.find((item) => item.product._id == productId)) {
                const { data } = await Axios_instance.patch(`/wishlist/update`, { productId }, { withCredentials: true })
                const updatedWishlist = data.wishlist
                setWishListItems(updatedWishlist)
                toast.success("removed")

            } else {
                const response = await Axios_instance.post(`/wishlist/add`, { productId }, { withCredentials: true })
                console.log(response)
                toast.success("Wishlist Added")
            }

            // }



        } catch (err) {
            console.log(err.response?.data || err.message)
            toast.error(err.response?.data?.message || "Something went wrong");
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
            const { data } = await Axios_instance.patch(`/wishlist/update`, { productId }, { withCredentials: true })
            const updatedWishlist = data.wishlist
            setWishListItems(updatedWishlist)
            toast.success("removed")
            // }
        } catch (err) {
            console.log(err.response?.data || err.message)
        }
    }

    return (<WishListContext.Provider value={{ addToWishlist, fetchWishListData, removeWishlist, wishlistItems }}>
        {children}
    </WishListContext.Provider>)
}