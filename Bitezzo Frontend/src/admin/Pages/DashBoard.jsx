import { useEffect, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import OrdersStatusPie from "../component/charts/OrdersStatusPie";
import OrdersPerUserBar from "../component/charts/OrdersPerUserBar";
import RevenueByDateLine from "../component/charts/RevenueByDateLine";
import TopProductsBar from "../component/charts/TopProductsBar";
import StatsCards from "../component/StatsCard";

import { ProductContext } from "../../context/ProductContext";
import { getDashboardStats } from "../services/adminApi";

export default function AdminDashboard() {
  const [ordersPerUser, setOrdersPerUser] = useState([]);
  const [orderByStatus,setOrderByStatus]=useState([])
  const [topSellingProduct,setTopSellingProduct]=useState([])
  const [revenueByDate,setRevenueByDate]=useState([])
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({})

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const dashboardStats = await getDashboardStats()
        if (mounted) {
          setStats(dashboardStats.stats || {});
          setOrdersPerUser(dashboardStats.OrdersByUser||[]);
          setOrderByStatus(dashboardStats.orderByStatus||[])
          setTopSellingProduct(dashboardStats.topSellingProduct||[])
          setRevenueByDate(dashboardStats.revenueByDate||[])
        }
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  console.log(stats)

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

  {/* ===== Header Section ===== */}
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor your business performance and analytics
        </p>
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Live Data
        </span>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  </header>

  {/* ===== Main Content ===== */}
  <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

    {/* --- KPI Section --- */}
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
        Key Performance Indicators
      </h2>
      <StatsCards stats={stats} />
    </section>

    {/* --- Charts Section --- */}
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="w-1 h-6 bg-purple-600 rounded-full mr-3"></span>
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

      {/* --- Chart Grid --- */}
      <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">

        {/* Orders Status Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Orders by Status</h3>
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <div style={{ width: "100%", height: "400px" }}>
            <OrdersStatusPie data={orderByStatus} />
          </div>
        </div>

        {/* Orders Per User Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Orders per User</h3>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
          </div>
          <div style={{ width: "100%", height: "400px" }}>
            <OrdersPerUserBar data={ordersPerUser} />
          </div>
        </div>

        {/* Revenue by Date Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Trends</h3>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
          </div>
          <div style={{ width: "100%", height: "400px" }}>
            <RevenueByDateLine data={revenueByDate} />
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
          </div>
          <div style={{ width: "100%", height: "400px" }}>
            <TopProductsBar data={topSellingProduct} />
          </div>
        </div>

      </div>
    </section>

    {/* --- Footer Insights --- */}
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboard Insights</h3>
          <p className="text-gray-600 text-sm">
            Data refreshes automatically every 5 minutes. Charts are interactive and exportable.
          </p>
        </div>
        <div className="flex space-x-6 text-sm text-gray-600 mt-4 sm:mt-0">
          <div className="text-center">
            {/* <div className="font-semibold text-gray-800">{orders.length}</div> */}
            <div>Total Orders</div>
          </div>
          <div className="text-center">
            {/* <div className="font-semibold text-gray-800">{users.length}</div> */}
            <div>Active Users</div>
          </div>
          <div className="text-center">
            {/* <div className="font-semibold text-gray-800">{products.length}</div> */}
            <div>Products</div>
          </div>
        </div>
      </div>
    </footer>

  </main>
</div>


  );
}