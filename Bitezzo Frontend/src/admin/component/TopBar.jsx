import React from 'react'

function TopBar() {
return (
  <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 w-full z-10">
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")} 
          className="text-2xl font-bold text-red-600 cursor-pointer"
        >
          Bitezzo
        </button>

        <button
          className="px-4 py-2 border border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
);

}

export default TopBar