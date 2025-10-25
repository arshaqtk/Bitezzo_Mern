import React, { useEffect, useState, useContext } from 'react'
import Axios_instance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { WishListContext } from '../../context/WishlistContext'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import { SearchNotFound } from '../components/Animation/SearchNotFound'
import ProductListView from '../components/Products/listview'
import ProductGridView from '../components/Products/gridView'

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
                          <ProductGridView
                            products={product}
                            handleAddToCart={handleAddToCart}
                            handleAddToWishlist={handleAddToWishlist}
                            isInCart={isInCart}
                            isInWishlist={isInWishlist}
                            reviewData={getRandomReviewData}
                          />
                        ) : (
                          <ProductListView
                            products={product}
                            handleAddToCart={handleAddToCart}
                            handleAddToWishlist={handleAddToWishlist}
                            isInCart={isInCart}
                            isInWishlist={isInWishlist}
                            reviewData={getRandomReviewData}
                          />
            
                        )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;