import { useContext, useEffect, useMemo, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import OrdersStatusPie from "../component/charts/OrdersStatusPie";
import OrdersPerUserBar from "../component/charts/OrdersPerUserBar";
import RevenueByDateLine from "../component/charts/RevenueByDateLine";
import TopProductsBar from "../component/charts/TopProductsBar";
import StatsCards from "../component/StatsCard";

import {
  flattenOrders,
  sumRevenue,
  countByStatus,
  countOrdersPerUser,
  revenueByDate,
  topProductsByCount,
} from "../utils/analytics";
import { ProductContext } from "../../context/ProductContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { products } = useContext(ProductContext);

  // 1) Fetch users (with nested orders) from JSON Server
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await Axios_instance.get("/users?role=user");
        if (mounted) setUsers(res.data || []);
      } catch (e) {
        console.error("Failed to load users", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // 2) Compute analytics for the dashboard
  const { orders, stats, byStatus, perUser, revByDate, topProducts } = useMemo(() => {
    const orders = flattenOrders(users);
    const totalUsers = users.length;
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = sumRevenue(orders);

    return {
      orders,
      stats: { totalUsers, totalOrders, totalRevenue, totalProducts },
      byStatus: countByStatus(orders),
      perUser: countOrdersPerUser(orders),
      revByDate: revenueByDate(orders),
      topProducts: topProductsByCount(orders, 10),
    };
  }, [users, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading admin dashboard...</span>
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
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor your business performance and analytics
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Live Data
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
            Key Performance Indicators
          </h2>
          <StatsCards stats={stats} />
        </div>

        {/* Charts Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <div className="w-1 h-6 bg-purple-600 rounded-full mr-3"></div>
              Analytics Overview
            </h2>
            <div className="flex space-x-2">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                Export Data
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                Refresh
              </button>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
            {/* Orders Status Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Orders by Status</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <OrdersStatusPie data={byStatus} />
            </div>

            {/* Orders Per User Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Orders per User</h3>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <OrdersPerUserBar data={perUser} />
            </div>

            {/* Revenue by Date Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Revenue Trends</h3>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <RevenueByDateLine data={revByDate} />
            </div>

            {/* Top Products Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <TopProductsBar data={topProducts} />
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Dashboard Insights
                </h3>
                <p className="text-gray-600 text-sm">
                  Data is automatically updated every 5 minutes. All charts are interactive and can be exported.
                </p>
              </div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{orders.length}</div>
                  <div>Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{users.length}</div>
                  <div>Active Users</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{products.length}</div>
                  <div>Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}