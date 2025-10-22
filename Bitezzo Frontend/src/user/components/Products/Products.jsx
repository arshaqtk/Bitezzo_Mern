import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { WishListContext } from '../../../context/WishlistContext';
import { AuthContext } from '../../../context/AuthContext';
import { ProductContext } from '../../../context/ProductContext';
import { Mosaic } from 'react-loading-indicators';
import ProductListView from './listview';
import ProductGridView from './gridView';

function Products() {
  // const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reviewData, setReviewData] = useState({})

  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);
  const { products, loading ,filterProductCategory} = useContext(ProductContext);

  useEffect(() => {
    // setAllProducts(products);
    setProduct(products);
  }, [products]);
  useEffect(() => {
    getRandomReviewData()
  }, [])


  function filterProduct(category) {
    setSelectedCategory(category);
   filterProductCategory(category)

    // let filtered = [];

    // if (category === "all") {
    //   filtered = allProducts;
    // } else {
    //   filtered = allProducts.filter((item) => item.category === category);
    // }

    // Apply sorting to filtered results
    // applySorting(filtered);
  }

  const applySorting = (items, sortType = sortBy) => {
    let sortedItems = [...items];

    if (sortType === 'price-low') {
      sortedItems.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === 'price-high') {
      sortedItems.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortType === 'name') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProduct(sortedItems);
  };


  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    applySorting(product, newSortBy);
  };

  // Placeholder for generating a random review count and star rating
  const getRandomReviewData = () => {
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1); // Random rating between 3.0 and 5.0
    const count = Math.floor(Math.random() * 500) + 10; // Random count between 10 and 510
    setReviewData({ rating, count })
  };



  const handleAddToCart = (item) => {
    addToCart({
      productId: item._id,
      price: item.price,
    });
  };

  const handleAddToWishlist = (item) => {
    addToWishlist({
      productId: item._id,
        price: item.price,
    });
  };

  const isInCart = (itemId) => cartItems.some((cart) => cart.product._id === itemId);
  const isInWishlist = (itemId) => wishlistItems.some((wishlist) => wishlist.productId === itemId);

  const categories = [
    { label: "All Items", value: "all" },
    { label: "Drinks & Beverages", value: "drinks" },
    { label: "Fast Food", value: "fastFood" },
    { label: "Gravy & Curry Dishes", value: "gravy" },
    { label: "Snacks & Sides", value: "snacks" },
    { label: "Desserts & Sweets", value: "desserts" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Mosaic color="#ef4444" size="medium" />
          <p className="text-gray-600 text-lg mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Our Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover our collection of <span className="font-semibold text-red-600">{product.length}</span> delicious items
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            {/* Mobile Dropdown */}
            <select
              className="w-full max-w-sm px-4 py-3 bg-white border border-gray-300 rounded-full shadow-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-red-500 md:hidden"
              value={selectedCategory}
              onChange={(e) => filterProduct(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-4 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => filterProduct(cat.value)}
                  className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${selectedCategory === cat.value
                    ? 'bg-red-600 text-white border-red-600 shadow-lg'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-md'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Controls */}
          {product.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Sort Controls */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="name">Name (A-Z)</option>

                </select>
              </div>

              {/* View Mode Controls */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'grid'
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
                  className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'list'
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

      {/* Products Grid/List */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {product.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category</p>
              <button
                onClick={() => filterProduct('all')}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Show All Products
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
                products={products}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                isInCart={isInCart}
                isInWishlist={isInWishlist}
                reviewData={reviewData}
              />
            ) : (
              <ProductListView
                products={products}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                isInCart={isInCart}
                isInWishlist={isInWishlist}
                reviewData={reviewData}
              />

            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;