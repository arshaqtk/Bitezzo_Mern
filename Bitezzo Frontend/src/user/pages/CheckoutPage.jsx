

import { useState, useMemo, useContext } from "react";
import { ShoppingCart, MapPin, Phone, User, CreditCard, Clock, Truck, Zap } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { ProductContext } from "../../context/ProductContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";





function CheckoutPage() {
 const location = useLocation();
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { shippingDetails, addShippingAddress } = useContext(OrderContext);
  const { products } = useContext(ProductContext);

  const { productId, price, fromBuyNow,deliveryCharge,subTotal } = location.state || {};

  const [username, setName] = useState(user.username);
  const [phone, setPhone] = useState(shippingDetails.phone || "");
  const [street, setStreet] = useState(shippingDetails.street || "");
  const [city, setCity] = useState(shippingDetails.city || "");
  const [pincode, setPincode] = useState(shippingDetails.pincode || "");
  const [method, setMethod] = useState("regular");

  const productDetail = useMemo(
    () => products.find((item) => item._id == productId),
    [products, productId]
  );
 

  let finalTotal = fromBuyNow ? price : subTotal;
  const [totalAmount, setTotalAmount] = useState(finalTotal);

  const deliveryFee = useMemo(() => {
    if (method === "express") {
      setTotalAmount(Number(finalTotal) + 40);
      return 40;
    }
    if (method === "fastest") {
      setTotalAmount(Number(finalTotal) + 70);
      return 70;
    }
    setTotalAmount(Number(finalTotal) + (deliveryCharge?deliveryCharge:20));
    return deliveryCharge?deliveryCharge:20;
  }, [method, finalTotal]);

  const shippingData = { name: username, street, city, pincode, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredKeys = ["name", "street", "city","pincode","phone"];

const allPresentAndNotNull = requiredKeys.every(
  key => Object.hasOwn(shippingData, key) && shippingData[key] != ""
);
if(allPresentAndNotNull){
  alert(allPresentAndNotNull)
    addShippingAddress(shippingData, totalAmount,price,method, { fromBuyNow, productId });
}else{
  toast.error("Fill all fields to proceed")
}
  };

  return (
    <>
 
      <div className="min-h-screen bg-gradient-to-br bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-4">
          
          {/* LEFT: Shipping Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <MapPin className="w-7 h-7" />
                Food Delivery Details
              </h2>
              <p className="text-red-100 mt-2">Please provide your delivery information</p>
            </div>

            <div className="p-8">
              <div className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-600" />
                    Personal Information
                  </h3>
                  
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-red-500" />
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-red-500" />
                    <input
                      required
                      type="text"
                      placeholder="Mobile No"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) setPhone(val);
                      }}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    Delivery Address
                  </h3>
                  
                  <textarea
                    required
                    placeholder="Delivery Address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none"
                  />

                  <select
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select City</option>
                    <option value="Kottakkal">Kottakkal</option>
                    <option value="Perinthalmanna">Perinthalmanna</option>
                    <option value="Vengara">Vengara</option>
                    <option value="Chemmad">Chemmad</option>
                    <option value="Valanjery">Valanjery</option>
                    <option value="Malappuram">Malappuram</option>
                  </select>

                  <input
                    required
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 6) setPincode(val);
                    }}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Delivery Speed Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    Delivery Speed
                  </h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${method === "regular" ? 'border-red-500 bg-red-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="regular"
                          checked={method === "regular"}
                          onChange={(e) => setMethod(e.target.value)}
                          className="sr-only"
                        />
                        <Truck className={`w-6 h-6 mr-4 ${method === "regular" ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <div>
                          <div className="font-semibold text-gray-800">Regular (₹{deliveryCharge?deliveryCharge:20})</div>
                          <div className="text-sm text-gray-600">40-50 min</div>
                        </div>
                      </div>
                      {method === "regular" && <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>}
                    </label>

                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${method === "express" ? 'border-red-500 bg-red-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={method === "express"}
                          onChange={(e) => setMethod(e.target.value)}
                          className="sr-only"
                        />
                        <Clock className={`w-6 h-6 mr-4 ${method === "express" ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <div>
                          <div className="font-semibold text-gray-800">Express (₹40)</div>
                          <div className="text-sm text-gray-600">25-30 min</div>
                        </div>
                      </div>
                      {method === "express" && <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>}
                    </label>

                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${method === "fastest" ? 'border-red-500 bg-red-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="fastest"
                          checked={method === "fastest"}
                          onChange={(e) => setMethod(e.target.value)}
                          className="sr-only"
                        />
                        <Zap className={`w-6 h-6 mr-4 ${method === "fastest" ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <div>
                          <div className="font-semibold text-gray-800">Fastest (₹70)</div>
                          <div className="text-sm text-gray-600">15-20 min</div>
                        </div>
                      </div>
                      {method === "fastest" && <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>}
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Fee:</span>
                      <span className="font-medium">₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-3">
                      <span>Subtotal:</span>
                      <span className="text-green-600">
                        ₹{finalTotal}+{deliveryFee}={totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Preview */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit sticky top-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                Your Order
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {fromBuyNow ? '1 item' : `${cartItems.length} items`}
              </p>
            </div>

            <div className="p-6">
              {fromBuyNow && productDetail ? (
                <div className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center hover:shadow-lg transition-all duration-300">
                  <img
                    src={productDetail.images[0].url || "/placeholder.png"}
                    alt={productDetail.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{productDetail.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">Quantity: 1</p>
                    <p className="text-lg font-bold text-red-600 mt-1">₹{price}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={item.productImage || "/placeholder.png"}
                        alt={item.productName}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.productName}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.productQuantity}
                        </p>
                        <p className="text-lg font-bold text-red-600 mt-1">
                          ₹{item.productPrice * item.productQuantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center text-green-700 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    Fresh food delivered hot to your doorstep!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;