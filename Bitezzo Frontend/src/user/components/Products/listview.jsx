import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListView = ({ products, handleAddToCart, handleAddToWishlist, isInCart, isInWishlist, reviewData }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6">
      {products.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div
              className="sm:w-64 h-48 sm:h-auto relative overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/productview/${item._id}`)}
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
                    onClick={() => navigate(`/productview/${item._id}`)}
                  >
                    {item.name}
                  </h3>

                  {/* Wishlist Button */}
                  <button
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isInWishlist(item._id)
                        ? "bg-red-100 text-red-500"
                        : "text-gray-400 hover:bg-red-100 hover:text-red-500"
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

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(reviewData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
                    </svg>
                  ))}
                  <span className="text-gray-500 text-sm ml-1">
                    ({reviewData.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{Math.floor(item.price * 1.2)}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    Save ₹{Math.floor(item.price * 0.2)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {isInCart(item.id) ? (
                  <button
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={() => navigate("/cart")}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    In Cart
                  </button>
                ) : (
                  <button
                    className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95"
                    onClick={() => handleAddToCart(item)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add to Cart
                  </button>
                )}

                <button
                  className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                  onClick={() => navigate(`/productview/${item._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListView;
