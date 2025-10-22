import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios_instance from '../../../api/axiosConfig';

import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { WishListContext } from '../../../context/WishlistContext';
import { SearchContext } from '../../../context/SearchContext';

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems, fetchCartData } = useContext(CartContext);
  const { wishlistItems, fetchWishListData } = useContext(WishListContext);
  const { acceptSearchValue } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleAccountMenu() {
    setShowAccountMenu((prev) => !prev);
  }

  useEffect(() => {
    fetchCartData();
    fetchWishListData();
  }, []);

  // Close mobile menu and account menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowAccountMenu(false);
  }, [location.pathname]);

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    acceptSearchValue(searchValue);
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate("/");
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16"></div>
      
      {/* Main Navigation */}
      <div className="fixed top-0 w-full z-50">
        <nav className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gradient-to-r from-gray-900 via-black to-gray-900'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* Logo */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => navigate("/")}
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-red-600 hover:text-red-700' : 'text-red-500 hover:text-red-400'
                  }`}
                >
                  Bitezzo
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? (isScrolled 
                              ? 'text-red-600 bg-red-50 border-b-2 border-red-600' 
                              : 'text-red-400 bg-red-900/20')
                          : (isScrolled
                              ? 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                              : 'text-gray-300 hover:text-red-400 hover:bg-white/10')
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Search, Cart, Wishlist, Account */}
              <div className="flex items-center space-x-4">
                
                {/* Desktop Search */}
                <form onSubmit={handleSearchSubmit} className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className={`h-4 w-4 ${isScrolled ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      onChange={handleSearchInput}
                      type="text"
                      placeholder="Search products..."
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                        isScrolled
                          ? 'bg-white border-gray-300 text-gray-900'
                          : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      }`}
                    />
                  </div>
                </form>

                {/* Mobile Search Toggle */}
                {!mobileSearchOpen && (
                  <button
                    onClick={() => setMobileSearchOpen(true)}
                    className={`block lg:hidden p-2 rounded-md transition-colors duration-200 ${
                      isScrolled 
                        ? 'text-gray-600 hover:text-red-600 hover:bg-gray-100' 
                        : 'text-gray-300 hover:text-red-400 hover:bg-white/10'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}

                {/* Cart Icon */}
                <button
                  onClick={() => navigate("/cart")}
                  className={`relative p-2 rounded-md transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-red-600 hover:bg-gray-100' 
                      : 'text-gray-300 hover:text-red-400 hover:bg-white/10'
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium ">
                      {cartItems.length > 9 ? '9+' : cartItems.length}
                    </span>
                  )}
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => navigate("/wishlist")}
                  className={`relative p-2 rounded-md transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-red-600 hover:bg-gray-100' 
                      : 'text-gray-300 hover:text-red-400 hover:bg-white/10'
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                    </span>
                  )}
                </button>

                {/* Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleAccountMenu}
                    className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                      isScrolled 
                        ? 'text-gray-600 hover:text-red-600 hover:bg-gray-100' 
                        : 'text-gray-300 hover:text-red-400 hover:bg-white/10'
                    }`}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {user && (
                      <span className="ml-2 text-sm font-medium hidden sm:block">
                        {user.name?.split(' ')[0] || 'User'}
                      </span>
                    )}
                  </button>
                  
                  {showAccountMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 transform transition-all duration-200">
                      {user ? (
                        <>
                          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={() => { navigate("/profile"); setShowAccountMenu(false); }}
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                          </button>
                          <button
                            onClick={() => { navigate("/order"); setShowAccountMenu(false); }}
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                            </svg>
                            My Orders
                          </button>
                          <div className="border-t border-gray-200">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => { navigate("/login"); setShowAccountMenu(false); }}
                            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                          </button>
                          <button
                            onClick={() => { navigate("/signup"); setShowAccountMenu(false); }}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                          >
                            <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Sign Up
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-red-600 hover:bg-gray-100' 
                      : 'text-gray-300 hover:text-red-400 hover:bg-white/10'
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  onChange={handleSearchInput}
                  type="text"
                  placeholder="Search products..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;