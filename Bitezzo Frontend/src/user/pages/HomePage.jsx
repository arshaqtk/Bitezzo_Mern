import React, { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../../api/axiosConfig';
import Footer from '../components/Footer/Footer';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { WishListContext } from '../../context/WishlistContext';
import burgerImg from '../../assets/images/burgerImg.png'
import {
  Truck,
  Leaf,
  Star,
  Heart,
  ShoppingCart,
  Award, Clock,
  Shield,
  ChefHat,
  Pizza,
  Coffee,
  Cake,
  Salad,
  Sandwich,
  ArrowRight,
  Play
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {

  const navigate = useNavigate();
  const [topProducts, setTopProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Pizza', icon: Pizza, color: 'bg-red-500', items: 25 },
    { id: 2, name: 'Beverages', icon: Coffee, color: 'bg-yellow-500', items: 18 },
    { id: 3, name: 'Desserts', icon: Cake, color: 'bg-pink-500', items: 15 },
    { id: 4, name: 'Salads', icon: Salad, color: 'bg-green-500', items: 12 },
    { id: 5, name: 'Sandwiches', icon: Sandwich, color: 'bg-orange-500', items: 20 },
    { id: 6, name: 'Chef Special', icon: ChefHat, color: 'bg-purple-500', items: 8 }
  ]);



  const { user } = useContext(AuthContext);
  const { addToCart,fetchCartData } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Fetch Top Selling Products
  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const { data } = await Axios_instance.get("/TopSellingProducts");
        const sorted = data.sort((a, b) => b.count - a.count).slice(0, 8);
        setTopProducts(sorted);
        setFeaturedProducts(sorted.slice(0, 4));
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    };

    fetchTopSelling();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <>
      <Banner />

      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Taste the
                <span className="text-yellow-300 block">Extraordinary</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                Experience culinary excellence with our handcrafted dishes made from the finest ingredients, delivered fresh to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="group px-8 py-4 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                >
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Story
                </button>
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="relative z-10 ">
                <img
                  src=""
                  alt="Delicious Food"
                  className="rounded-3xl  w-full max-w-lg mx-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our diverse menu categories crafted to satisfy every craving
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group cursor-pointer"
                onClick={() => navigate(`/products?category=${category.name}`)}
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.items} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional food experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Get your meals delivered hot and fresh within 30 minutes", color: "blue" },
              { icon: Leaf, title: "Fresh Ingredients", desc: "We source only the finest, locally-grown organic ingredients", color: "green" },
              { icon: Star, title: "5-Star Rated", desc: "Loved by thousands of customers with 4.9/5 rating", color: "yellow" },
              { icon: Shield, title: "Safe & Hygienic", desc: "Prepared in certified kitchens following strict safety protocols", color: "purple" }
            ].map((feature, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group text-center"
              >
                <div className="bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-${feature.color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-10 h-10 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites that our customers can't get enough of
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.productId}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isInWishlist(product.productId) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.productId) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button
                        onClick={() => navigate(`/productview/${product.productId}`)}
                        className="w-full bg-white text-gray-900 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors duration-300 flex items-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>


      {/* Top Selling Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Best Sellers
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dishes that have won the hearts (and stomachs) of our customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProducts.map((product, index) => (
              <div
                key={product.productId}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    #{index + 1} Best Seller
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="font-bold text-gray-900 mb-2 cursor-pointer hover:text-orange-600 transition-colors duration-300"
                    onClick={() => navigate(`/productview/${product.productId}`)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-gray-600 text-sm ml-2">(4.9)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      25-30 min
                    </div>
                    <span className="font-bold text-orange-600">₹{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the best food delivery in town
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-12 py-4 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 text-lg"
            >
              Start Ordering Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;