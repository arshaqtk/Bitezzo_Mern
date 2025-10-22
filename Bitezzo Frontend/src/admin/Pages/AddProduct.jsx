import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ArrowLeft, Upload, Eye, Save, X, Package, Tag, DollarSign, Hash, Image as ImageIcon } from "lucide-react";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset image error when image URL changes
    if (name === 'image') {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addProduct(formData);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancel = () => {
    const hasChanges = Object.values(formData).some(value => value !== '');
    if (hasChanges) {
      const res = confirm("Are you sure you want to cancel? All changes will be lost.");
      if (res) {
        navigate("/admin/products");
      }
    } else {
      navigate("/admin/products");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/admin/products')}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Create a new product for your inventory
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
                  <span className="text-sm text-blue-700 font-medium">Draft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your product in detail..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 resize-none"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Provide a detailed description to help customers understand your product
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="drinks">🥤 Drinks</option>
                  <option value="snacks">🍿 Snacks</option>
                  <option value="gravy">🍛 Gravy</option>
                  <option value="fastfood">🍔 Fast Food</option>
                  <option value="desserts">🍰 Desserts</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Pricing & Inventory
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Price */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Hash className="w-4 h-4 mr-2 text-gray-500" />
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Number of items available in stock
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                Product Image
              </h3>
            </div>
            <div className="p-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="w-4 h-4 mr-2 text-gray-500" />
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a valid URL for the product image
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Image Preview
                  </h4>
                  <div className="relative inline-block">
                    {!imageError ? (
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                      />
                    ) : (
                      <div className="w-40 h-40 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Image not found</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;