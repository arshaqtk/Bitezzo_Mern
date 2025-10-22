import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { ProductContext } from "./ProductContext";
import axios from "axios";


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
            const {data} = await Axios_instance.get(`http://localhost:5000/cart/`,{withCredentials:true})
            const cart=data.cart
            console.log(data.cart[0].items)
            setCartItems(cart[0].items)
            setCartItemsCount(
                cart[0].items.map((item) => ({
                    id: item.product._id,
                    count: item.quantity,
                    productPrice: item.price
                }))
            );
            setSubTotal(cart.items.reduce((sum, item) => sum += item.price * item.quantity, 0))
        } catch (err) {
            console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }

    useEffect(() => {
        if (user.id) {
            fetchCartData()
        }
    }, [])




    //________Add_To_Cart__________

    const addToCart = async ({ productId, price }) => {
        try {
                const response = await axios.post(`http://localhost:5000/cart/add`, { productId, price }, { withCredentials: true })
                const subtotal = response.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setSubTotal(subtotal);
                toast.success("Added to cart!");
        } catch (err) {
           console.error("Axios Cart error:", err.response?.data || err.message);
        }
    }


    //________UpdateQuantity_____________


    const updateQuantity = async (productId, type) => {

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

        const subtotal = updatedCartItemsCount.reduce((sum, item) => sum + item.productPrice * item.count, 0);
        setSubTotal(subtotal);


        try {
            // const { data } = await Axios_instance.get(`/users/${user.id}`);
            // const cartData = data.cart ?? data[0]?.cart;

            // if (!cartData) throw new Error("Cart data not found");


            // const updatedQuantity = cartData.map((item) => {
            //     const cartItem = updatedCartItemsCount.find((c) => c.id === item.productId);

            //     return item.productId === id ? { ...item, productQuantity: cartItem ? cartItem.count : item.productQuantity }
            //         : item;
            // });

            const UpdatedCart = await axios.patch(`http://localhost:5000/cart/updateQuantity`, {productId,action:type },{withCredentials:true})
            console.log(UpdatedCart)

        }
        catch (err) {
             console.error("Axios Cart error:", err.response?.data || err.message);
        }

        console.log(cartItemCount)
    }



    //______Remove_Item_From_Cart___________



    const removeItem = async (productId) => {
        try {
          
           const updatedCart= await Axios_instance.patch(`http://localhost:5000/cart/remove`, {productId})
            setCartItems(updatedCart)

            toast.success("Item Removed ")
            const subtotal = filteredCart.reduce((sum, item) => sum + item.productPrice * item.productQuantity, 0);
            setSubTotal(subtotal);
        }
        catch (e) {
            console.log(e)
        }

        console.log(cartItemCount)
    }




    return (<CartContext.Provider value={{ addToCart, removeItem, updateQuantity, fetchCartData, cartItems, cartItemCount, subTotal, setSubTotal }}>
        {children}
    </CartContext.Provider>)

}