import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { WishListContext } from "../../context/WishlistContext";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import axios from "axios";

function ProductDetailView() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
  async function fetchData() {
    try {
      const { data } = await axios.get(`http://localhost:5000/products/${id}`);
      console.log(data)
      
        const { _id, name, price, images, category, description, quantity } = data;
        setProduct([{ id:_id, name, price, images, description, category, quantity }]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
  fetchData();
}, [id]);


  // Fetch similar products based on category
  useEffect(() => {
    async function fetchSimilarProducts() {
      if (product.length > 0) {
        try {
          const currentProduct = product[0];
          const { data } = await axios.get(`http://localhost:5000/products/`)
          
          // Filter products by same category, exclude current product, and limit to 4
          const similar = data
            .filter(item => item.category === currentProduct.category && item.id !== currentProduct.id)
            .slice(0, 4)
            .map(({ _id, name, price, images, category }) => ({ _id, name, price, images, category }));
          
          setSimilarProducts(similar);
        } catch (error) {
          console.error("Error fetching similar products:", error);
        }
      }
    }
    fetchSimilarProducts();
  }, [product]);


  console.log(similarProducts)

  const getRandomReviewData = () => {
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1);
    const count = Math.floor(Math.random() * 200) + 10;
    return { rating, count };
  };

  if (product.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen  flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">No Product Found</h2>
      </div>
    );
  }

  // Placeholder for review data
  const rating = 4.5;
  const reviewCount = 124;

  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg key={`filled-${i}`} className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
          <linearGradient id="half-gradient" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="rgb(234, 179, 8)" />
            <stop offset="50%" stopColor="rgb(209, 213, 219)" />
          </linearGradient>
          <path fill="url(#half-gradient)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    return stars;
  };

return (
  <div className="bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto px-4 md:px-8 my-10">
      {product.map((product) => (
        <div key={product.id}>
          {/* Product Detail Section */}
          <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 p-6 lg:p-10 my-12">
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-auto max-h-[600px] rounded-2xl shadow-lg object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 text-gray-800 flex flex-col justify-center py-4">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mt-2 mb-4">
                <div className="flex">{renderStars()}</div>
                <span className="text-gray-600 text-sm ml-2">
                  ({reviewCount} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <p className="mt-4 text-4xl font-extrabold text-gray-900">
                ₹{product.price}
              </p>

              {/* Category */}
              <p className="mt-1 text-sm text-gray-600">
                Category:{" "}
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </p>

              {/* Stock Alerts */}
              {product.quantity === 0 && (
                <p className="font-semibold text-red-600">
                  Product is out of stock
                </p>
              )}
              {product.quantity < 5 && product.quantity > 0 && (
                <p className="font-semibold text-red-600">
                  Only {product.quantity} Left
                </p>
              )}

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {cartItems.some((cart) => cart.productId == product.id) ? (
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                    onClick={() => navigate("/cart")}
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      if (product.quantity === 0) {
                        toast.error("Product is out of stock");
                        return;
                      }
                      addToCart({
                        productId: product.id,
                        price: product.price,
                       
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition-colors"
                  onClick={() => {
                    if (product.quantity === 0) {
                      toast.error("Product is out of stock");
                      return;
                    }
                    navigate("/checkout", {
                      state: {
                        fromBuyNow: true,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Similar Products
                </h2>
                <button
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => navigate("/products")}
                >
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similarProducts.map((item) => {
                  const { rating, count } = getRandomReviewData();
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group relative cursor-pointer"
                      onClick={() => navigate(`/productview/${item.id}`)}
                    >
                      {/* Discount */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          -{Math.floor(Math.random() * 20 + 10)}%
                        </span>
                      </div>

                      {/* Wishlist */}
                      <button
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist({
                            user_id: auth.id,
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill={
                            wishlistItems.some(
                              (wishlist) => wishlist.productId === item.id
                            )
                              ? "#ef4444"
                              : "none"
                          }
                          stroke={
                            wishlistItems.some(
                              (wishlist) => wishlist.productId === item.id
                            )
                              ? "#ef4444"
                              : "#6b7280"
                          }
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      {/* Product Image */}
                      <div className="h-40 overflow-hidden">
                        <img
                          src={item.images[0].url}
                          alt={item.images[0].alt}

                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Content */}
                      <div className="p-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.round(rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
                            </svg>
                          ))}
                          <span className="text-gray-500 text-xs ml-1">
                            ({count})
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>

                        {/* Price & Button */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900">
                              ₹{item.price}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{Math.floor(item.price * 1.2)}
                            </span>
                          </div>

                          {cartItems.some(
                            (cart) => cart.product._id === item._id
                          ) ? (
                            <button
                              className="p-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/cart");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                              className="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart({
                                  productId: item._id,
                                  price: item.price,
                                 
                                });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

}

export default ProductDetailView;