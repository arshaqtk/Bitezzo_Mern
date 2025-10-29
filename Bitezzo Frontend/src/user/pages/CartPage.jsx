import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {Trash2, Plus, Minus,ShoppingBag, ArrowRight, Heart,Star, Clock, Truck,ShoppingCart,} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Cartpage() {
  const { removeCart, updateQuantity, cartItems, cartItemCount, subTotal,fetchCartData } = useContext(CartContext);
  const [cart,setCart]=useState([])
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const deliveryFee = subTotal > 500 ? 0 : 20;
  const tax = Math.round(subTotal * 0.05); // 5% tax
  const total = subTotal + deliveryFee + tax - discount;


  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true
    });
    setCart(cartItems)
    fetchCartData()
  }, []);

  const getItemQuantity = (productId) => {
    return cartItemCount.find((cartItem) => cartItem.id === productId)?.count ?? 1;
  };

  const removeProduct=(productId)=>{
  removeCart(productId)
  setCart(prev => prev.filter(item => item.product._id !== productId));

}


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md" data-aos="fade-up">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you haven't added any delicious items to your cart yet. 
            Start exploring our amazing menu!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 mt-5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.product._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.images[0].alt}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-orange-100 text-orange-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                            {item.product.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>4.5</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>25-30 min</span>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{item.product.price}
                            <span className="text-sm font-normal text-gray-600 ml-2">per item</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.product._id, "decrease")}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">
                              {getItemQuantity(item.product._id)}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, "increase")}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-lg font-bold text-orange-600">
                            ₹{item.product.price}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeProduct(item.product._id)}
                          className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200 group/remove"
                        >
                          <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform duration-200" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="sticky top-8 space-y-6">
              

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subTotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Delivery Fee
                    </span>
                    <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                {deliveryFee === 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Free delivery on orders above ₹500!</span>
                  </div>
                )}

                <button
                  onClick={() =>navigate("/checkout", { state: { subTotal: total,deliveryCharge:deliveryFee } })}
                  className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;