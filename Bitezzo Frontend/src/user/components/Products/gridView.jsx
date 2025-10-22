import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGridView = ({
  products,
  handleAddToCart,
  handleAddToWishlist,
  isInCart,
  isInWishlist,
  reviewData
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-4 md:px-8 max-w-screen-xl w-full">
      {products.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
        >
          {/* Discount Badge */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
            <span className="bg-green-500 text-white text-xs font-bold px-1.5 sm:px-2 py-1 rounded-md">
              -{Math.floor(Math.random() * 20 + 10)}%
            </span>
          </div>

          {/* Wishlist Heart */}
          <button
            className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(item);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
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
            className="relative h-32 sm:h-48 overflow-hidden cursor-pointer"
            onClick={() => navigate(`/productview/${item._id}`)}
          >
            <img
              src={item.images?.[0]?.url || "https://via.placeholder.com/150"}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Section */}
          <div className="p-3 sm:p-4">
            {/* Stars Rating */}
            <div className="flex items-center gap-1 mb-1 sm:mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                    i < Math.round(reviewData.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
                </svg>
              ))}
              <span className="text-gray-500 text-xs ml-1">
                ({reviewData.count})
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-tight">
              {item.name}
            </h3>

            {/* Price and Add Button Row */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-bold text-gray-900">
                  ₹{item.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{Math.floor(item.price * 1.2)}
                </span>
              </div>

              {/* Add to Cart Button */}
              {isInCart(item._id) ? (
                <button
                  className="p-1.5 sm:p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="p-1.5 sm:p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridView;
