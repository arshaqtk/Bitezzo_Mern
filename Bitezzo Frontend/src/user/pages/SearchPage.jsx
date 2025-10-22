import React, { useEffect, useState, useContext } from 'react'
import Axios_instance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { WishListContext } from '../../context/WishlistContext'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import { SearchNotFound } from '../components/Animation/SearchNotFound'

function SearchPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    async function fetchData(searchValue) {
      setIsLoading(true);
      try {
        const response = await Axios_instance.get('/products');
        const responseData = response.data;
        let results = responseData.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        // Apply sorting
        if (sortBy === 'price-low') {
          results = results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          results = results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
          results = results.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setAllProducts(responseData);
        setProduct(results);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData(searchValue);
  }, [searchValue, sortBy]);

  const getRandomReviewData = () => {
    return {
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      count: Math.floor(Math.random() * 500 + 10) // Random count between 10-510
    };
  };

  const handleAddToCart = (item) => {
    addToCart({
      user_id: user.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const handleAddToWishlist = (item) => {
    addToWishlist({
      user_id: user.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const isInCart = (itemId) => cartItems.some((cart) => cart.productId === itemId);
  const isInWishlist = (itemId) => wishlistItems.some((wishlist) => wishlist.productId === itemId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Searching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-lg text-gray-600">
              {product.length > 0 ? (
                <>
                  Found <span className="font-semibold text-red-600">{product.length}</span> products for 
                  <span className="font-semibold text-gray-900"> "{searchValue}"</span>
                </>
              ) : (
                <>No products found for <span className="font-semibold text-gray-900">"{searchValue}"</span></>
              )}
            </p>
          </div>

          {/* Filters and Controls */}
          {product.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Sort Controls */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>

              {/* View Mode Controls */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-red-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-red-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {product.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <SearchNotFound />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse our categories</p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-black transition-colors duration-200"
              >
                Browse All Products
              </button>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "flex justify-center" 
            : "space-y-6"
          }>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-8 max-w-screen-xl w-full">
                {product.map((item, index) => {
                  const { rating, count } = getRandomReviewData();
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                    >
                      {/* Discount Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          -{Math.floor(Math.random() * 20 + 10)}%
                        </span>
                      </div>

                      {/* Wishlist Heart */}
                      <button
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWishlist(item);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill={isInWishlist(item.id) ? "#ef4444" : "none"}
                          stroke={isInWishlist(item.id) ? "#ef4444" : "#6b7280"}
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      {/* Image Section */}
                      <div
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/productview/${item.id}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        {/* Stars Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
                            </svg>
                          ))}
                          <span className="text-gray-500 text-xs ml-1">({count})</span>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-semibold text-gray-800 text-sm mb-3 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>

                        {/* Price and Add Button Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{Math.floor(item.price * 1.2)}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          {isInCart(item.id) ? (
                            <button
                              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/cart");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              product.map((item, index) => {
                const { rating, count } = getRandomReviewData();
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div 
                        className="sm:w-64 h-48 sm:h-auto relative overflow-hidden cursor-pointer group"
                        onClick={() => navigate(`/productview/${item.id}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Discount Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                            -{Math.floor(Math.random() * 20 + 10)}%
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 
                              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
                              onClick={() => navigate(`/productview/${item.id}`)}
                            >
                              {item.name}
                            </h3>
                            <button
                              className={`p-2 rounded-full transition-all duration-200 ${
                                isInWishlist(item.id)
                                  ? 'bg-red-100 text-red-500'
                                  : 'text-gray-400 hover:bg-red-100 hover:text-red-500'
                              }`}
                              onClick={() => handleAddToWishlist(item)}
                            >
                              <svg 
                                className="h-6 w-6" 
                                fill={isInWishlist(item.id) ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                strokeWidth={2} 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Stars Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
                              </svg>
                            ))}
                            <span className="text-gray-500 text-sm ml-1">({count} reviews)</span>
                          </div>

                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-bold text-gray-900">₹{item.price}</span>
                            <span className="text-lg text-gray-400 line-through">
                              ₹{Math.floor(item.price * 1.2)}
                            </span>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                              Save ₹{Math.floor(item.price * 0.2)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {isInCart(item.id) ? (
                            <button
                              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                              onClick={() => navigate("/cart")}
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              In Cart
                            </button>
                          ) : (
                            <button
                              className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95"
                              onClick={() => handleAddToCart(item)}
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Add to Cart
                            </button>
                          )}
                          <button
                            className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                            onClick={() => navigate(`/productview/${item.id}`)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;