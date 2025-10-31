import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Package, AlertTriangle, Search, Filter, Edit, Trash2, Plus, Eye, TrendingUp, Ban } from "lucide-react";
import { getAllProduct, softDeleteProduct } from "../services/adminProductApi";

const ProductTable = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
    const [activeFilter, setActiveFilter] = useState("all");
  


  const handleSoftDelete = async (productId) => {

    const product = await softDeleteProduct(productId)
    if(product.success){
    setProducts(prev => prev.map((p) =>
      p._id === productId ? { ...p, isActive: !p.isActive } : p
    ))
  }
  }


  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getAllProduct()
      console.log(products)
      setProducts(products)
    }
    fetchProduct()
  }, []);

  // Filter products based on search term, category, and stock status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock = stockFilter === "all" ||
      (stockFilter === "instock" && product.count > 0) ||
      (stockFilter === "outofstock" && product.count === 0);

       const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && product.isActive === true) ||
        (activeFilter === "inactive" && product.isActive === false);

    return matchesSearch && matchesCategory && matchesStock&&matchesActive;
  });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const inactiveProducts = products.filter(p => !p.isActive).length;
  const outOfStock = products.filter(p => p.stock === 0).length;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your product inventory and catalog
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/add-product")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
              </div>
            </div>
          </div>

          {/* Inactive Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive Products</p>
                <p className="text-2xl font-bold text-red-600">{inactiveProducts}</p>
              </div>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gray-100">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-700">{outOfStock}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full py-3 px-4 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div className="flex gap-4">
        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="py-2 px-3 border border-gray-300 rounded-lg"
        >
          <option value="all">All Stock Status</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
        </select>

        {/* Active/Inactive Filter */}
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="py-2 px-3 border border-gray-300 rounded-lg"
        >
          <option value="all">All Activity</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredProducts.length} of {totalProducts} products</span>
            {(searchTerm || categoryFilter !== "all" || stockFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setStockFilter("all");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {["Product", "Details", "Category", "Price", "Stock", "Actions"].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className={`transition-colors duration-200 ${product.isActive
                        ? "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                        : "bg-red-200 text-gray-500"
                        }`}
                    >

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className={`h-16 w-16 rounded-lg object-cover border-2 ${product.isActive ? "border-gray-200" : "border-red-300 opacity-70"
                                }`}
                              src={product?.images[0]?.url}
                              alt={product.name}
                            />

                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              {product.name}
                              {!product.isActive && (
                                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                  Inactive
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-gray-500">ID: {product._id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={product.description}>
                          {product.description}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.count === 0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 ring-1 ring-red-300">
                            Out of Stock
                          </span>
                        ) : product.quantity <= 5 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300">
                            Low Stock ({product.count})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 ring-1 ring-green-300">
                            In Stock ({product.count})
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/admin/product-view/${product._id}`)}
                            className="inline-flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="View Product"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                            className="inline-flex items-center p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          {product.isActive ? (
                            <button
                              onClick={() => handleSoftDelete(product._id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSoftDelete(product._id)}
                              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                            >
                              Activate
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No products found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;