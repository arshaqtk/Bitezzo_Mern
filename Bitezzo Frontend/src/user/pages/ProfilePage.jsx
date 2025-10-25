import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import {User, Camera,Settings, Heart, ShoppingBag, Star, Award} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileSetting from "../components/Profile/ProfileSetting";
import ProfileInformation from "../components/Profile/ProfileInformation";
import axios from "axios";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData,setUserData]=useState([])
  
  const [stats,setSats] = useState({
    totalOrders: 0,
    favoriteItems: 0,
    totalSpent: 0,
    loyaltyPoints: 0
  });



  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true
    });
    const fetchData=async ()=>{
      const response = await Axios_instance.get("/user/profile", {withCredentials: true});
             const userData = response.data;
             setUserData(userData)
          
            //  const orders=userData.orders.length
            //  const wishlist=userData.wishlist.length
            //  const totalExpense=userData.orders.reduce((total,item)=>total+=item.subTotal,0)
            //  const loyaltyPoints=(userData.orders.length)*100
            //  setSats({...stats,totalOrders:orders,favoriteItems:wishlist,totalSpent:totalExpense,loyaltyPoints})
    }
    fetchData()
  }, []);

 
  const handleImageUpload = () => {
    // Placeholder for image upload functionality
    toast.info("Image upload feature coming soon!");
  };


  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8" data-aos="fade-down">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-12 text-white relative  opacity-75 backdrop-blur-lg shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button
                  onClick={handleImageUpload}
                  className="absolute bottom-2 right-2 bg-white text-orange-500 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.username}</h1>
                <p className="text-white/80 text-lg mb-4">{userData.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {stats.loyaltyPoints>500? <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>Gold Member</span>
                  </div>:""}
                 
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>{stats.loyaltyPoints} Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'blue' },
            { label: 'Favorites', value: stats.favoriteItems, icon: Heart, color: 'red' },
            { label: 'Total Spent', value: `₹${stats.totalSpent}`, icon: Award, color: 'green' },
            { label: 'Loyalty Points', value: stats.loyaltyPoints, icon: Star, color: 'yellow' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1" data-aos="fade-right">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Account Menu</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3" data-aos="fade-left">
            
            {/* Profile Tab */}
            {/* {activeTab === 'profile' && (
             <ProfileInformation/>
            )} */}

            {/* Orders Tab */}
            {/* {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Orders</h2>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div
                        key={order.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="border rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{order.item}</h3>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₹{order.amount}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                      View All Orders
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {/* Settings Tab */}

            {/* {activeTab === 'settings' && (
              <ProfileSetting/>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;