import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CubeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogout } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavigation = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon, letter: "D" },
    { to: "/admin/users", label: "Users", icon: UserIcon, letter: "U" },
    { to: "/admin/products", label: "Products", icon: CubeIcon, letter: "P" },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon, letter: "O" },
  ];

  const managementLinks = [
    { to: "/admin/add-product", label: "Add Product", icon: PlusCircleIcon, letter: "A" },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

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
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700 shadow-2xl
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-72' : 'w-20'}
        flex flex-col
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl p-4">B</span>
          </div>
          <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-xl font-bold text-white">Bitezzo</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-8">
        
        {/* Main Navigation */}
        <div>
          <div className={`mb-4 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              Main Menu
            </h2>
          </div>
          <nav className="space-y-2">
            {mainNavigation.map(({ to, label, icon: Icon, letter }) => {
              const isActive = isActiveRoute(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    group relative flex items-center px-3 py-3 rounded-xl
                    transition-all duration-200 transform hover:scale-105
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }
                  `}
                >
                  {isExpanded ? (
                    <Icon className={`h-6 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  ) : (
                    <div className={`w-5 h-6 flex items-center justify-center font-bold text-sm ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {letter}
                    </div>
                  )}
                  <span className={`ml-4 font-medium transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}>
                    {label}
                  </span>
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                      {label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Management Section */}
        <div>
          <div className={`mb-4 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
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
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }
                  `}
                >
                  <Icon className={`h-6 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className={`ml-4 font-medium transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}>
                    {label}
                  </span>
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                      {label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            group relative w-full flex items-center px-3 py-3 rounded-xl
            text-red-400 hover:text-white hover:bg-red-600/20
            transition-all duration-200 transform hover:scale-105
          `}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-5 text-red-400 group-hover:text-red-300" />
          <span className={`ml-4 font-medium transition-all duration-300 ${
            isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            Logout
          </span>
          
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
              Logout
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}