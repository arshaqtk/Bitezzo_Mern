import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  Search, 
  Filter, 
  Calendar,
  Package,
  User,
  DollarSign,
  Eye,
  RefreshCw
} from "lucide-react";

function AdminViewOrder() {
  const { fetchAllOrderData, allOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      await fetchAllOrderData();
      setLoading(false);
    };
    loadOrders();
  }, []);

  // Filter orders by status
  const filterOrders = (status) => {
    const filtered = allOrder.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
    setOrders(filtered);
  };

  // Reset filter (show all orders)
  const resetFilter = () => {
    setOrders([]);
    setSearchTerm("");
    setDateFilter("");
  };

  // Apply search and date filters
  const getFilteredOrders = () => {
    let filtered = orders.length > 0 ? orders : allOrder;
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchTerm) ||
        order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (dateFilter) {
      filtered = filtered.filter(order => 
        order.date.includes(dateFilter)
      );
    }
    
    return filtered;
  };

  // Counts
  const pendingCount = allOrder.filter(o => o.status.toLowerCase() === "pending").length;
  const confirmedCount = allOrder.filter(o => o.status.toLowerCase() === "confirmed").length;
  const deliveredCount = allOrder.filter(o => o.status.toLowerCase() === "delivered").length;
  const canceledCount = allOrder.filter(o => o.status.toLowerCase() === "canceled").length;

  // Calculate total revenue
  const totalRevenue = allOrder.reduce((sum, order) => sum + parseFloat(order.subTotal), 0);

  // Function to determine status badge colors
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 ring-1 ring-yellow-300";
      case "canceled":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 ring-1 ring-red-300";
      case "delivered":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-300";
      case "confirmed":
        return "bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 ring-1 ring-blue-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 ring-1 ring-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "canceled":
        return <XCircle className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "confirmed":
        return <Truck className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = getFilteredOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading orders...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor and manage all customer orders
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Total Revenue: </span>
                    <span className="font-semibold text-blue-700">₹{totalRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            onClick={() => filterOrders("pending")}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 group-hover:bg-yellow-200 transition-colors">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => filterOrders("confirmed")}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => filterOrders("delivered")}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{deliveredCount}</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => filterOrders("canceled")}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Canceled</p>
                <p className="text-2xl font-bold text-gray-900">{canceledCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by Order ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200"
                />
              </div>
            </div>
            
            {/* Date Filter */}
            <div className="lg:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredOrders.length} of {allOrder.length} orders</span>
            {(orders.length > 0 || searchTerm || dateFilter) && (
              <button
                onClick={resetFilter}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Date & Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate(`/admin/order-detailview/${order.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">#{order.id}</div>
                          <div className="text-xs text-gray-500">Order ID</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-gray-100 mr-3">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.shippingAddress.name}</div>
                            <div className="text-xs text-gray-500">{order.shippingAddress.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div>
                          <div className="text-sm text-gray-900">{new Date(order.date).toLocaleDateString('en-IN')}</div>
                          <div className="text-xs text-gray-500">{order.products.length} items</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          ₹{parseFloat(order.subTotal).toLocaleString('en-IN')}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/order-detailview/${order.id}`);
                          }}
                          className="inline-flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No orders found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewOrder;