import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../components/NavBar/Nav'
import { WishListContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function WishlistPage() {
  const navigate = useNavigate();
  const { removeWishlist, wishlistItems } = useContext(WishListContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [wishlist,setWishlist]=useState([])

  useEffect(()=>{
setWishlist(wishlistItems)
  },[])
  console.log(wishlist)

const removeProduct=(productId)=>{
  removeWishlist(productId)
  setWishlist(prev => prev.filter(item => item.product._id !== productId));
}
  // Function to generate random review data
  const getRandomReviewData = () => {
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
    const count = Math.floor(Math.random() * 200) + 10;
    return { rating, count };
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {wishlist.length > 0 
                ? `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} in your wishlist`
                : 'Your collection of favorites'
              }
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                {/* Empty wishlist icon */}
                <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-full h-full"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start adding products you love to see them here!
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {wishlist.map((item) => {
                const { rating, count } = getRandomReviewData();
                return (
                  <div
                    key={item.product._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{Math.floor(Math.random() * 20 + 10)}%
                      </span>
                    </div>

                    {/* Remove from Wishlist Heart */}
                    <button
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProduct(item.product._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    {/* Image Section */}
                    <div
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/productview/${item.product._id}`)}
                    >
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.images[0].alt}
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
                        {item.product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-gray-900">₹{item.product.price}</span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{Math.floor(item.product.price * 1.2)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {cartItems.some((cart) => cart.product._id === item.product._id) ? (
                          <button
                            className="flex-1 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            onClick={() => navigate("/cart")}
                          >
                            In Basket
                          </button>
                        ) : (
                          <button
                            className="flex-1 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                user_id: user.id,
                                productId: item.product._id,
                                name: item.product.name,
                                price: item.product.price,
                                image: item.product.images[0].url,
                              });
                              toast.success("Added to cart");
                            }}
                          >
                            Add to Cart
                          </button>
                        )}
                        
                        <button
                          className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          onClick={() => navigate(`/productview/${item.product._id}`)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Browse More Section */}
          {wishlist.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all"
              >
                Browse More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WishlistPage;