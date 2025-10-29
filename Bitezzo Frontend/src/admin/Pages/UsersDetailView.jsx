import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";
import { getUserById, getUserCart, getUserOrders } from "../services/adminUserApi";

function UserDetailView() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [carts,setCart]=useState([])

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getUserById(id)
        const order =await getUserOrders(id)
        const cart=await getUserCart(id)
        setUser(user);
        setOrders(order)
        setCart(cart)
        
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading user details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The requested user could not be found.</p>
          <button 
            onClick={() => navigate('/admin/user')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
     
        <div key={user._id}>
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => navigate('/admin/users')}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                      />
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      user.isAuthenticated
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-300"
                        : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 ring-1 ring-red-300"
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        user.isAuthenticated ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      {user.isAuthenticated ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* User Information Card */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      User Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {[
                        { label: 'Full Name', value: user.name, icon: '👤' },
                        { label: 'Email Address', value: user.email, icon: '📧' },
                        // { label: 'Phone Number', value: user.shippingAddress?.phone || 'Not provided', icon: '📱' },
                        // { label: 'Address', value: user.shippingAddress?.address || 'Not provided', icon: '🏠' },
                        // { label: 'City', value: user.shippingAddress?.city || 'Not provided', icon: '🌆' },
                        // { label: 'Pincode', value: user.shippingAddress?.pincode || 'Not provided', icon: '📮' },
                      ].map(({ label, value, icon }) => (
                        <div key={label} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">{icon}</span>
                            <p className="text-sm font-medium text-gray-600">{label}</p>
                          </div>
                          <p className="text-base text-gray-900 ml-7">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{orders?.length || 0}</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{carts?.length || 0}</div>
                      <div className="text-sm text-gray-600">Cart Items</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart and Orders */}
              <div className="xl:col-span-2 space-y-8">
                
                {/* Cart Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5M14 5V4a2 2 0 00-2-2H8a2 2 0 00-2 2v1" />
                      </svg>
                      Shopping Cart ({carts?.length || 0} items)
                    </h3>
                  </div>
                  <div className="p-6">
                    {carts && carts.length > 0 ? (
                      <div className="space-y-4">
                        {carts.map((cartItem) => (
                          <div
                            key={cartItem.productId}
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                          >
                            <img
                              src={cartItem.product.images[0]?.url}
                              alt={cartItem.product.name}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                            />
                            <div className="ml-4 flex-1">
                              <h4 className="font-semibold text-gray-900">{cartItem.product.name}</h4>
                              <p className="text-green-600 font-medium">₹{cartItem.product.price?.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                Qty: {cartItem.quantity}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Total: ₹{(cartItem.product.price * cartItem.quantity)?.toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">🛒</div>
                        <p className="text-gray-500">Cart is empty</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Order History ({orders?.length || 0} orders)
                    </h3>
                  </div>
                  <div className="p-6">
                    {orders && orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-gray-900">Order #{order._id}</h4>
                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                              </div>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === "canceled" || order.status === "cancelled"
                                  ? "bg-red-100 text-red-800 ring-1 ring-red-300"
                                  : order.status === "delivered"
                                  ? "bg-green-100 text-green-800 ring-1 ring-green-300"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300"
                                  : "bg-blue-100 text-blue-800 ring-1 ring-blue-300"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="text-lg font-bold text-green-600">
                                ₹{order.total?.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">📋</div>
                        <p className="text-gray-500">No orders found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default UserDetailView;