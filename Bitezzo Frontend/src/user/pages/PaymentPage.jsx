import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function PaymentPage() {
  const { shippingDetails, addCartPayment, addBuyNowPayment } = useContext(OrderContext)
  const { user } = useContext(AuthContext)
  const { totalAmount } = useContext(OrderContext)
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Razorpay');
  
  console.log(shippingDetails)
  
  const location = useLocation();
  const { productId, fromBuyNow,price,method } = location.state || {};

  const openRazorpay = () => {
    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M", // Dummy Test Key
      amount: totalAmount * 100, // = 500.00 INR
      currency: "INR",
      name: "Bitezzo",
      description: "Paying....",
      image: "https://yourlogo.png",
      handler: function (response) {
        toast.success("Payment Successful!");
        if (fromBuyNow) {
          addBuyNowPayment({paymentId:response.razorpay_payment_id,price,method, totalAmount, productId,type:"Razorpay"})
        } else {
          addCartPayment({paymentId:response.razorpay_payment_id,method, totalAmount,type:"Razorpay"})
        }
      },
      prefill: {
        name: "Arshaq Tk",
        email: "arshaq@example.com",
        contact: "9876543210",
      },
      notes: {
        Street: "Test Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCashOnDelivery = () => {
    const codOrderId = `COD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    toast.success(`Order Placed Successfully!`);
    
    if (fromBuyNow) {
      addBuyNowPayment({codOrderId,price,method, totalAmount, productId,type:"COD"})
    } else {
      addCartPayment({codOrderId,method, totalAmount,type:"COD"})
    }
    
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === 'online') {
      openRazorpay();
    } else {
      handleCashOnDelivery();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8">
          Complete Payment
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Shipping Details */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-800 font-bold text-xl">📍 Shipping Address</span>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-20">Name:</span>
                  <span className="font-medium">{shippingDetails.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-20">Street:</span>
                  <span>{shippingDetails.street}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-20">Phone:</span>
                  <span>{shippingDetails.phone}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-20">City:</span>
                  <span>{shippingDetails.city}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-600 w-20">Pin:</span>
                  <span>{shippingDetails.pincode}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-800 font-bold text-xl">📋 Order Summary</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
                  <span className="text-gray-800 font-bold text-lg">Total Amount:</span>
                  <span className="font-bold text-red-600 text-2xl">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                💳 Select Payment Method
              </h3>
              
              <div className="space-y-4">
                {/* Online Payment Option */}
                <div 
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                    selectedPaymentMethod === 'online' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedPaymentMethod('online')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="online"
                      checked={selectedPaymentMethod === 'online'}
                      onChange={() => setSelectedPaymentMethod('online')}
                      className="mr-4 text-red-600 w-5 h-5"
                    />
                    <div className="flex-1">
                      <label htmlFor="online" className="font-semibold text-gray-800 cursor-pointer text-lg">
                        💳 Pay Online
                      </label>
                      <p className="text-gray-600 mt-1">Pay securely using Credit/Debit Card, UPI, Net Banking</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Instant</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Secure</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div 
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                    selectedPaymentMethod === 'cod' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedPaymentMethod('cod')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={selectedPaymentMethod === 'cod'}
                      onChange={() => setSelectedPaymentMethod('cod')}
                      className="mr-4 text-red-600 w-5 h-5"
                    />
                    <div className="flex-1">
                      <label htmlFor="cod" className="font-semibold text-gray-800 cursor-pointer text-lg">
                        💵 Cash on Delivery
                      </label>
                      <p className="text-gray-600 mt-1">Pay when your order is delivered to your doorstep</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">No advance payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Action */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <button
                onClick={handlePayment}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {selectedPaymentMethod === 'online' ? '💳 Pay ₹' + totalAmount + ' Now' : '📦 Place Order (COD)'}
              </button>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-500 flex items-center justify-center">
                  🔒 {selectedPaymentMethod === 'online' ? 'Secure Payment Powered by Razorpay' : 'Pay cash when delivered'}
                </p>
                {selectedPaymentMethod === 'cod' && (
                  <p className="text-xs text-gray-400 mt-2">
                    COD available for orders above ₹1
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage