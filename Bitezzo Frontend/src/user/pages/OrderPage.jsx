import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/NavBar/Nav'
import { OrderContext } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Axios_instance from '../../api/axiosConfig';
import toast from 'react-hot-toast';

function OrderPage() {
    const { orderDetails, fetchOrderData } = useContext(OrderContext);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    const cancelOrder = async (orderId) => {
        try {
            
            await Axios_instance.patch(`order/${orderId}/cancel`,{},{withCredentials:true});
            fetchOrderData();
            toast.success("Order has been canceled");
        } catch (e) {
            console.log(e);
            toast.error("Failed to cancel order");
        }
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'canceled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'canceled':
                return (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'delivered':
                return (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                My Orders
                            </h1>
                            <p className="text-lg text-gray-600">
                                Track and manage your orders
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {orderDetails.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-auto">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                                <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Orders List
                        <div className="space-y-8">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                            <p className="text-3xl font-bold text-gray-900">{orderDetails.length}</p>
                                        </div>
                                        <div className="bg-blue-100 rounded-full p-3">
                                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                            <p className="text-3xl font-bold text-gray-900">
                                                ₹{orderDetails.reduce((sum, order) => sum + order.total, 0)}
                                            </p>
                                        </div>
                                        <div className="bg-green-100 rounded-full p-3">
                                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                            <p className="text-3xl font-bold text-gray-900">
                                                {orderDetails.filter(order => order.status.toLowerCase() === 'pending').length}
                                            </p>
                                        </div>
                                        <div className="bg-yellow-100 rounded-full p-3">
                                            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Orders */}
                            {orderDetails.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Order Header */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-2xl font-bold text-gray-900">Order #{item.id}</h2>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                                                        {getStatusIcon(item.status)}
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
                                                        </svg>
                                                        <span className="font-medium">Ordered on {item.createdAt}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                        <span className="font-medium">{item.items.length} items</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left lg:text-right">
                                                <p className="text-3xl font-bold text-gray-900 mb-2">₹{item.total}</p>
                                                {item.status.toLowerCase() === "pending" && (
                                                    <button
                                                        className="bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
                                                        onClick={() => cancelOrder(item._id)}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Order Content */}
                                    <div className="p-8">
                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* Shipping Address */}
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="bg-blue-100 rounded-full p-2">
                                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
                                                </div>
                                                <div className="space-y-1 text-gray-700">
                                                    <p className="font-semibold text-gray-900">{item.address.name}</p>
                                                    <p>{item.address.street}</p>
                                                    <p>{item.address.city}</p>
                                                    <p>PIN: {item.address.pincode}</p>
                                                    <p>Phone: {item.address.phone}</p>
                                                </div>
                                            </div>

                                            {/* Order Summary */}
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="bg-green-100 rounded-full p-2">
                                                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-gray-700">
                                                        <span>Items ({item.items.length})</span>
                                                        <span className="font-medium">₹{item.total}</span>
                                                    </div>
                                                    <div className="flex justify-between text-gray-700">
                                                        <span>Delivery</span>
                                                        <span className="font-medium text-green-600">Free</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-3">
                                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                                            <span>Total</span>
                                                            <span>₹{item.total}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Products List */}
                                        <div className="mt-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="bg-gray-100 rounded-full p-2">
                                                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">Items Ordered</h3>
                                            </div>
                                            <div className="grid gap-4">
                                                {item.items.map((products) => (
                                                    <div 
                                                        className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-100" 
                                                        key={products.product._id}
                                                    >
                                                        <div className="relative">
                                                            <img
                                                                src={products.product.images[0].url}
                                                                alt={products.product.name}
                                                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                                                            />
                                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                                                {products.quantity}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-900 text-lg mb-1">{products.product.name}</h4>
                                                            <p className="text-sm text-gray-600 mb-2">Quantity: {products.product.quantity}</p>
                                                            <p className="text-lg font-bold text-gray-900">₹{products.price * products.quantity}</p>
                                                        </div>
                                                        <button
                                                            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                                            onClick={() => navigate(`/productview/${products.product._id}`)}
                                                        >
                                                            View Product
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrderPage;