import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { ProductContext } from "./ProductContext";
import axios from "axios";
import { data } from "react-router-dom";


export const CartContext = createContext()
export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemsCount] = useState([{ id: "", count: 1, productPrice: 0 }])
    const [subTotal, setSubTotal] = useState(0)
    const { products } = useContext(ProductContext);
    const { user } = useContext(AuthContext)


    //_________Data____Fetching_______________
    async function fetchCartData() {
        try {
            const {data} = await Axios_instance.get(`/cart/`,{withCredentials:true})
            const cart=data.cart[0]
           if(cart){
            setCartItems(cart?.items)
            setCartItemsCount(
                cart.items.map((item) => ({
                    id: item.product._id,
                    count: item.quantity,
                    productPrice: item.price
                }))
            );
            setSubTotal(cart.items.reduce((sum, item) => sum += item.price * item.quantity, 0))
        }
        } catch (err) {
             toast.error(err.response?.data?.message || "Issue in fetching cart");
            console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }

    useEffect(() => {
        // if (user.id) {
            fetchCartData()
        // }
    }, [])




    //________Add_To_Cart__________

    const addToCart = async ({ productId, price }) => {
        try {
                const {data} = await Axios_instance.post(`/cart/add`, { productId, price }, { withCredentials: true })
               console.log(data)
               const cart=data.cart.items
                const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setCartItems(cart)
                setSubTotal(subtotal);
                toast.success("Added to cart!");
        } catch (err) {
             toast.error(err.response?.data?.message || "Something went wrong");
           console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }


    //________UpdateQuantity_____________


    const updateQuantity = async (productId, type) => {
console.log(productId,type)
console.log(cartItemCount)
        const updatedCartItemsCount = cartItemCount.map((item) =>
            item.id === productId
                ? { ...item, count: type === "increase" ? item.count + 1 : Math.max(1, item.count - 1) }
                : item
        );

        // if (updatedCartItemsCount.find(item => item.id === id).count > products.find(p => p.id === id).quantity) {
        //     toast.error("Product quantity exceeds available stock");
        //     return;
        // }
        setCartItemsCount(updatedCartItemsCount);
console.log(updatedCartItemsCount)
        

        try {
            // const { data } = await Axios_instance.get(`/users/${user.id}`);
            // const cartData = data.cart ?? data[0]?.cart;
            
            // if (!cartData) throw new Error("Cart data not found");
            
            
            // const updatedQuantity = cartData.map((item) => {
                //     const cartItem = updatedCartItemsCount.find((c) => c.id === item.productId);
                
                //     return item.productId === id ? { ...item, productQuantity: cartItem ? cartItem.count : item.productQuantity }
                //         : item;
                // });
                
                const updatedCart = await Axios_instance.patch(`/cart/updateQuantity`, {productId,action:type },{withCredentials:true})
                console.log(updatedCart)
                  const cartData =updatedCart.data.cart.items
             setCartItems(cartData)
                const subtotal = cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            setSubTotal(subtotal);
        }
        catch (err) {
           toast.error(err.response?.data?.message || "Something went wrong");
             console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }



    //______Remove_Item_From_Cart___________



    const removeCart = async (productId) => {
        try {
          
           const updatedCart= await Axios_instance.patch(`/cart/remove`, {productId},{withCredentials:true})
        
        const cartData =updatedCart.data.cart.items
             setCartItems(cartData)
console.log(cartData)
            toast.success("Item Removed ")
            const subtotal = cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            setSubTotal(subtotal);
        }
        catch (err) {
           console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }




    return (<CartContext.Provider value={{ addToCart, removeCart, updateQuantity, fetchCartData, cartItems, cartItemCount, subTotal, setSubTotal,setCartItems,setCartItemsCount }}>
        {children}
    </CartContext.Provider>)

}