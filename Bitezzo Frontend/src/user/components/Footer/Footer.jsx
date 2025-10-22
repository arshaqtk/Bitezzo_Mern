import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Bitezzo</h1>
            <p className="text-sm leading-6 text-gray-400">
              Delicious meals delivered to your door. Fresh ingredients, quick service, and unbeatable taste.
            </p>
            <div className="flex space-x-4 pt-4">
  {/* Instagram */}
  <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
    <svg
      className="w-6 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608C4.516 2.565 5.783 2.294 7.149 2.232 8.415 2.175 8.795 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.672.367 3.68 1.36 2.687 2.352 2.45 3.455 2.392 4.732 2.334 6.012 2.32 6.421 2.32 9.68v4.64c0 3.259.014 3.668.072 4.948.058 1.277.295 2.38 1.288 3.372.992.993 2.095 1.23 3.372 1.288 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.277-.058 2.38-.295 3.372-1.288.993-.992 1.23-2.095 1.288-3.372.058-1.28.072-1.689.072-4.948V9.68c0-3.259-.014-3.668-.072-4.948-.058-1.277-.295-2.38-1.288-3.372-.992-.993-2.095-1.23-3.372-1.288C15.668.014 15.259 0 12 0z"/>
      <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 8z"/>
      <circle cx="18.406" cy="5.594" r="1.44"/>
    </svg>
  </button>

  {/* X (Twitter) */}
  <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26L22 21.75h-6.373l-4.993-6.59-5.713 6.59H1.613l7.72-8.91L2 2.25h6.57l4.49 5.993L18.244 2.25zM17.1 19.92h1.833L7.05 4.004H5.083L17.1 19.92z"/>
    </svg>
  </button>

  {/* WhatsApp */}
  <button className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300">
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 .02 5.34.02 11.95c0 2.11.56 4.17 1.62 5.97L0 24l6.27-1.64a11.94 11.94 0 0 0 5.72 1.46h.01c6.63 0 11.98-5.34 11.98-11.95 0-3.2-1.25-6.2-3.46-8.39zM12 21.54a9.58 9.58 0 0 1-4.88-1.34l-.35-.21-3.72.97.99-3.63-.23-.37a9.51 9.51 0 0 1-1.47-5.13c0-5.28 4.3-9.58 9.6-9.58 2.56 0 4.97.99 6.78 2.8a9.54 9.54 0 0 1 2.8 6.78c0 5.28-4.3 9.59-9.6 9.59zm5.38-7.14c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.17.19-.33.21-.62.08-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.45-1.7-1.63-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.33.44-.49.15-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.49h-.54c-.18 0-.47.07-.73.36s-.95.93-.95 2.28.97 2.64 1.11 2.82c.15.19 1.9 2.89 4.61 4.05.64.27 1.13.43 1.52.55.64.2 1.23.17 1.69.1.52-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.06-.12-.26-.19-.55-.34z"/>
    </svg>
  </button>
</div>

          </div>
              
          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button 
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline"
                    onClick={() => navigate(link.path)}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
                  
          {/* Customer Service */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Customer Service</h2>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Shipping Info", 
                "Returns & Refunds",
                "Support"
              ].map((service) => (
                <li key={service}>
                  <button className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
                 
          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Stay Updated</h2>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest offers and news delivered to your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bitezzo. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {[
                "Privacy Policy",
                "Terms of Service", 
                "Cookie Policy"
              ].map((policy) => (
                <button 
                  key={policy}
                  className="text-sm text-gray-500 hover:text-red-400 transition-colors duration-200"
                >
                  {policy}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;