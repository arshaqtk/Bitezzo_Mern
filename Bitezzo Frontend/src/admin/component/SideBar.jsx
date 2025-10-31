import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CubeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogout } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavigation = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { to: "/admin/users", label: "Users", icon: UserIcon },
    { to: "/admin/products", label: "Products", icon: CubeIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon }
  ];

  const managementLinks = [
    { to: "/admin/add-product", label: "Add Product", icon: PlusCircleIcon }
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      adminLogout();
      navigate("/login");
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen
        bg-white
        border-r border-gray-200 shadow-lg
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64" : "w-20"}
        flex flex-col
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow">
            {/* You can use your logo here */}
            <span className="text-white font-bold text-xl p-4">B</span>
          </div>
          <div className={`transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-xl font-bold text-gray-800">Bitezzo</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-8">
        {/* Main Navigation */}
        <div>
          <div className={`mb-4 transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
              Main Menu
            </h2>
          </div>
          <nav className="space-y-2">
            {mainNavigation.map(({ to, label, icon: Icon }) => {
              const isActive = isActiveRoute(to);
              return (
                <Link
  key={to}
  to={to}
  className={`
    group relative flex items-center px-3 py-3 rounded-xl
    transition-all duration-200 transform hover:scale-105
    ${isActive
      ? "bg-blue-100 text-blue-700 shadow"
      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
    }
  `}
>
  {/* ✅ Always show icon */}
  <Icon
    className={`h-6 w-6 flex-shrink-0 ${
      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-blue-700"
    }`}
  />

  {/* ✅ Hide label when collapsed */}
  <span
    className={`ml-4 font-medium transition-all duration-300 ${
      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
    }`}
  >
    {label}
  </span>

  {/* ✅ Tooltip when collapsed */}
  {!isExpanded && (
    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
      {label}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
    </div>
  )}
</Link>

              );
            })}
          </nav>
        </div>

        {/* Management Section */}
        <div>
          <div className={`mb-4 transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
              Quick Actions
            </h2>
          </div>
          <nav className="space-y-2">
            {managementLinks.map(({ to, label, icon: Icon }) => {
              const isActive = isActiveRoute(to);
              return (
               <Link
  key={to}
  to={to}
  className={`
    group relative flex items-center px-3 py-3 rounded-xl
    transition-all duration-200 transform hover:scale-105
    ${isActive
      ? "bg-blue-100 text-blue-700 shadow"
      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
    }
  `}
>
  {/* ✅ Always show icon */}
  <Icon
    className={`h-6 w-6 flex-shrink-0 ${
      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-blue-700"
    }`}
  />

  {/* ✅ Hide label when collapsed */}
  <span
    className={`ml-4 font-medium transition-all duration-300 ${
      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
    }`}
  >
    {label}
  </span>

  {/* ✅ Tooltip when collapsed */}
  {!isExpanded && (
    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
      {label}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
    </div>
  )}
</Link>



              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {/* Logout Button */}
       <button
  onClick={handleLogout}
  className={`
    group relative flex items-center px-3 py-3 rounded-xl
    text-gray-700 hover:text-red-600 hover:bg-gray-50
    transition-all duration-200 transform hover:scale-105
  `}
>
  {/* ✅ Always show icon */}
  <LogOut className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-red-600" />

  {/* ✅ Show label only when expanded */}
  <span
    className={`ml-4 font-medium transition-all duration-300 ${
      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
    }`}
  >
    Logout
  </span>

  {/* ✅ Tooltip when collapsed */}
  {!isExpanded && (
    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
      Logout
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
    </div>
  )}
</button>

      </div>
    </aside>
  );
}
