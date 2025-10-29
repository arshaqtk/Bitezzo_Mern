import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import { ArrowLeft, MapPin,   Package, Calendar, CreditCard, User, Phone, Mail,Clock,CheckCircle,  Truck,XCircle,AlertCircle,DollarSign,Hash,} from 'lucide-react';

function AdminOrderDetailView() {
  const { fetchAllOrderData, allOrder, editOrderStatus } = useContext(OrderContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      await fetchAllOrderData();
      setLoading(false);
    };
    loadOrder();
  }, []);

  useEffect(() => {
    if (allOrder.length > 0) {
      const foundOrder = allOrder.find((o) => String(o.id) === String(id));
      setOrder(foundOrder || null);
    }
  }, [allOrder, id]);

  const handleStatusChange = async (orderId, newStatus, userId) => {
    setStatusUpdating(true);
    try {
      setOrder((prev) => ({ ...prev, status: newStatus }));
      await editOrderStatus(orderId, newStatus, userId);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'delivered':
        return <Truck className="w-4 h-4" />;
      case 'canceled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading order details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The requested order could not be found.</p>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const totalItems = order.products.reduce((sum, product) => sum + product.productQuantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/admin/orders')}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{order.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Hash className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Order ID</p>
                <p className="text-lg font-bold text-gray-900">#{order.id}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-lg font-bold text-green-600">₹{parseFloat(order.subTotal).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Items</p>
                <p className="text-lg font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Order Date</p>
                <p className="text-lg font-bold text-gray-900">{new Date(order.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Order Information and Status */}
          <div className="xl:col-span-1 space-y-8">
            
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Shipping Address
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: User, label: 'Name', value: order.shippingAddress.name },
                  { icon: MapPin, label: 'Address', value: order.shippingAddress.address },
                  { icon: MapPin, label: 'City', value: order.shippingAddress.city },
                  { icon: Hash, label: 'Pincode', value: order.shippingAddress.pincode },
                  { icon: Phone, label: 'Phone', value: order.shippingAddress.phone },
                ].map(({ icon: label, value }) => (
                  <div key={label} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-gray-900">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Status Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Order Status
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payment ID</p>
                      <p className="text-sm font-medium text-gray-900">{order.payment}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status:
                    </label>
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value, order.userId)}
                        disabled={statusUpdating}
                        className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      {statusUpdating && (
                        <div className="p-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Changes are saved automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-purple-600" />
                  Ordered Items ({order.products.length} products, {totalItems} items)
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {product.productName}
                        </h4>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ₹{product.productPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="flex items-center">
                            <Package className="w-3 h-3 mr-1" />
                            Qty: {product.productQuantity}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-lg font-bold text-green-600">
                          ₹{(product.productPrice * product.productQuantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{parseFloat(order.subTotal).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetailView;