import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../api/axiosConfig';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import axios from 'axios';

export const OrderContext = createContext()
export const OrderProvider = ({ children }) => {

   const [shippingDetails, setShippingDetails] = useState({})
   const [totalAmount, setTotalAmount] = useState(0)
   const [orderDetails, setOrderDetails] = useState([])
   const [allOrder, setAllOrderDetails] = useState([])


   const navigate = useNavigate();
   const { user } = useContext(AuthContext)
   const { cartItems, subTotal,fetchCartData } = useContext(CartContext);



   const fetchOrderData = async () => {
      try {
         if(user.id){
             const userResponse = await Axios_instance.get(`users/${user.id}`)
         const userResponseData = userResponse.data
         setShippingDetails(userResponseData.shippingAddress||{})
         setOrderDetails(userResponseData.orders||[])
         }
        
      } catch (error) {
         console.error(error);
      }


   }


   useEffect(() => {
      fetchOrderData()
   }, [])




   const addShippingAddress = async (shippingData, TotalAmount,price ,method,{ fromBuyNow, productId }) => {
      try {
         setTotalAmount(TotalAmount)
         setShippingDetails(shippingData)
         if (fromBuyNow) {
            navigate("/payment", { state: { fromBuyNow, productId,price ,method} })
         } else {
            navigate("/payment")
         }
      } catch (error) {
         console.error( error);
      }


   }

   const addCartPayment = async (paymentId, subtotal,type) => {

      try {
         const userResponse = await Axios_instance.get(`users/${user.id}`)
         const userResponseData = userResponse.data
         const order = [{ id: Date.now(),userId:user.id,products: cartItems, status:"pending",paymentType:type.type,payment: paymentId, subTotal: subtotal, date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails },...userResponseData.orders ]

         setOrderDetails(order)
         const response = await Axios_instance.patch(`users/${user.id}`, { orders: order })
         navigate("/products")

         
         for (const item of cartItems) {
            const {data} = await Axios_instance.get(`products/${item.productId}`)
            data.quantity = data.quantity - item.productQuantity;
            console.log("Updated product quantity:", data.quantity);
            await Axios_instance.patch(`products/${item.productId}`, { quantity: data.quantity })
         }

         fetchAllOrderData()
         if (response.data) {
            try{
                await Axios_instance.patch(`users/${user.id}`, { cart: [] })
            fetchCartData()
            await updateTopSellingProducts(cartItems);
            }catch(e){
               console.log(e)
            }
           
         }
      } catch (error) {
         console.error( error);
      }



   }

   const addBuyNowPayment = async ({paymentId,method,quantity=1, totalAmount,price, productId,type}) => {

      try {
         // console.log(type.type)
         // const product = await Axios_instance.get(`products/${productId}`)
         // const ProductData = { productId: product.data.id, productName: product.data.name, productPrice: product.data.price, productImage: product.data.image, productQuantity: 1 }

         // const userResponse = await Axios_instance.get(`users/${user.id}`)
         // const userResponseData = userResponse.data
         // const order = [ { id: Date.now(), products: [ProductData],userId:user.id, status:"pending",paymentType:type.type,payment: paymentId, subTotal: subtotal, date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails },...userResponseData.orders]

         // setOrderDetails(order)
         // await Axios_instance.patch(`users/${user.id}`, { orders: order })
         // fetchAllOrderData()
         // await updateTopSellingProducts([ProductData]);
         // navigate("/products")

         const order=await axios.post("http://localhost:5000/order/direct",{productId,price,quantity,address:shippingDetails,total:totalAmount,deliverySpeed:method,paymentMethod:type},{withCredentials:true})
      } catch (error) {
         console.error( error);
      }

   }


   const updateTopSellingProducts = async (products) => {
  try {
    for (const item of products) {
      // Check if product already exists in TopSellingProducts
      const { data: existingProducts } = await Axios_instance.get(`/TopSellingProducts?productId=${item.productId}`);
      
      if (existingProducts.length > 0) {
        const existing = existingProducts[0];
        await Axios_instance.patch(`/TopSellingProducts/${existing.id}`, {
          count: existing.count + item.productQuantity
        });
      } else {
        await Axios_instance.post(`/TopSellingProducts`, {
          productId: item.productId,
          name: item.name || item.productName,
          image: item.image || item.productImage,
          price: item.price || item.productPrice,
          count: item.productQuantity
        });
      }
    }
  } catch (error) {
    console.error("Error updating TopSellingProducts:", error);
  }
};



//______Admin__________
   const fetchAllOrderData=async()=>{
      try{
         const response=await Axios_instance.get('/users?role=user')
      const users=response.data
      
      const orderData=users.flatMap(user => user.orders);
      console.log(orderData)
      setAllOrderDetails(orderData)
      }catch(e){
         console.log(e)
      }
   }
const editOrderStatus = async (orderId, newStatus,userId) => {
  try {
   console.log("now",orderId,newStatus)
    const userResponse = await Axios_instance.get(`users/${userId}`);
    const userResponseData = userResponse.data;

    
    const updatedOrders = userResponseData.orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    console.log("updated",updatedOrders)
    
    await Axios_instance.patch(`users/${userId}`, { orders: updatedOrders });

   
    fetchAllOrderData();
  } catch (error) {
    console.error(error);
  }
};


   

   return (<OrderContext.Provider value={{ addShippingAddress, shippingDetails, addCartPayment, orderDetails, addBuyNowPayment, totalAmount,fetchOrderData,fetchAllOrderData,allOrder,editOrderStatus}}>
      {children}
   </OrderContext.Provider>)
}

