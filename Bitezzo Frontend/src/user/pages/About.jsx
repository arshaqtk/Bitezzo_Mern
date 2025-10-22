import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-yellow-300">Bitezzo</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your one-stop destination for fresh, delicious, and high-quality food products 
            delivered right to your doorstep
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-semibold">Where Every Bite Matters!</span>
              <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        {/* Introduction Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that good food is more than just taste – it's about health, happiness, and sharing moments with the people you love. At Bitezzo, we're passionate about connecting you with the finest food products while making your shopping experience seamless and enjoyable.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming the way you experience food shopping through innovation and excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-6 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Freshness Accessible</h3>
              <p className="text-gray-600 leading-relaxed">
                Making fresh, quality food products accessible to everyone, ensuring you get the best with every order.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-6 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Variety at Your Fingertips</h3>
              <p className="text-gray-600 leading-relaxed">
                Curating a diverse selection of products to satisfy every taste and dietary preference you might have.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-6 group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Implementing strict quality checks and standards to ensure every product meets our high expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Bitezzo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bitezzo?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us different and why thousands of customers trust us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-xl mb-6 group-hover:bg-red-300 transition-colors">
                <svg className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Handpicked Products</h3>
              <p className="text-gray-700">Every item undergoes strict quality checks to meet our high standards.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-xl mb-6 group-hover:bg-blue-300 transition-colors">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Convenience First</h3>
              <p className="text-gray-700">Order anytime, anywhere, with our seamless and intuitive platform.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-green-200 rounded-xl mb-6 group-hover:bg-green-300 transition-colors">
                <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable & Reliable</h3>
              <p className="text-gray-700">Enjoy the best deals without compromising on quality or reliability.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-xl mb-6 group-hover:bg-purple-300 transition-colors">
                <svg className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-Centric</h3>
              <p className="text-gray-700">We are dedicated to providing you with a smooth and enjoyable shopping experience.</p>
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center pb-16">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover why Bitezzo is the preferred choice for quality food shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Shopping Now
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-red-600 transition-all duration-200 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}