import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ChefHat, Star, Clock, Award } from "lucide-react";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        toast.error("Please fill in all fields");
      } else if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        await signup({name, email, password});
      }
    } catch (e) {
      setShowError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-6 relative">
      {/* Background Image Overlay - Hidden on mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 hidden md:block"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>
      
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/50 hidden md:block"></div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10">
        
        {/* Left Branding - Minimal on mobile */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-red-500 to-red-600 text-white p-4 md:p-10 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Background Pattern - Hidden on mobile */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 translate-y-20"></div>
          </div>
          
          <div className="relative z-10 text-center">
            {/* Logo Section - Compact on mobile */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 justify-center">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ChefHat className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">Bitezzo</h1>
            </div>

            {/* Main Heading - Smaller on mobile */}
            <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-3">Culinary Excellence</h2>
            
            {/* Description - Hidden on mobile */}
            <p className="text-red-100 text-center leading-relaxed text-sm mb-6 hidden md:block">
              Join us and start your journey with the finest dishes crafted by our expert chefs.
            </p>

            {/* Features - Hidden on mobile, shown on desktop */}
            <div className="space-y-4 hidden md:block">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <span className="text-sm">Fresh ingredients daily</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-sm">5-star rated dishes</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-sm">Quick delivery service</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-sm">Award-winning chefs</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Signup Form */}
        <div className="w-full md:w-1/2 p-4 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
              <p className="text-gray-500 text-sm">
                Fill in your details to register and get started
              </p>
            </div>

            <form onSubmit={handleFormData} className="space-y-4 md:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-2 pl-11 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm md:text-base"
                  />
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-2 pl-11 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm md:text-base"
                  />
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-2 pl-11 pr-11 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm md:text-base"
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <EyeIcon className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-2 pl-11 pr-11 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm md:text-base"
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <EyeIcon className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {showError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center font-medium">{showError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 md:py-2 rounded-lg font-semibold text-sm md:text-base shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;