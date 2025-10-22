import React, { useContext, useEffect, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import Sidebar from "../component/SideBar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toggleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios_instance.get("/users?role=user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toggleUser]);

  const toggleBlock = async (id, isAuthenticated) => {
    try {
      await toggleUser(id, !isAuthenticated);
      setUser((prevUsers) =>
        prevUsers.map((u) =>
          u.id === id ? { ...u, isAuthenticated: !isAuthenticated } : u
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // Filter users based on search term and status
  const filteredUsers = users.filter(user => {
    console.log(user)
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && user.isAuthenticated) ||
                         (statusFilter === "inactive" && !user.isAuthenticated);
    return matchesSearch && matchesStatus;
  });

  const activeUsers = users.filter(user => user.isAuthenticated).length;
  const inactiveUsers = users.filter(user => !user.isAuthenticated).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage and monitor user accounts
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-600">Active: </span>
                          <span className="font-semibold text-green-700">{activeUsers}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-gray-600">Inactive: </span>
                          <span className="font-semibold text-red-700">{inactiveUsers}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200"
                    />
                  </div>
                </div>
                
                {/* Status Filter */}
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full py-3 px-4 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors duration-200"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Showing {filteredUsers.length} of {users.length} users</span>
                {(searchTerm || statusFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Profile
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User Details
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
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div 
                              onClick={() => navigate(`/admin/users-detailview/${user.id}`)}
                              className="cursor-pointer group"
                            >
                              <div className="relative">
                                <img
                                  src={user.image}
                                  alt={user.username}
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-200"
                                />
                                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{user.username}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                user.isAuthenticated
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-1 ring-green-300"
                                  : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 ring-1 ring-red-300"
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                user.isAuthenticated ? "bg-green-500" : "bg-red-500"
                              }`}></div>
                              {user.isAuthenticated ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => toggleBlock(user.id, user.isAuthenticated)}
                              className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-white text-sm transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                                user.isAuthenticated
                                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                              }`}
                            >
                              {user.isAuthenticated ? (
                                <>
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                  </svg>
                                  Block
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Unblock
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">No users found</h3>
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
      </div>
    </div>
  );
}