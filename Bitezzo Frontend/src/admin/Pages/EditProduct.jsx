import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { ProductContext } from "../../context/ProductContext";

function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  const { editProduct } = useContext(ProductContext);



  const fetchData = async () => {
    try{
      const response = await Axios_instance.get(`/products/${id}`)
    const productData = Array.isArray(response.data) ? response.data[0] : response.data;

    setProduct(productData)
    setFormData({
      name: productData?.name || "",
      description: productData?.description || "",
      price: productData?.price || "",
      image: productData?.image || "",
      category: productData?.category || "",
      quantity: productData?.quantity || "",


    });
   
    }catch (error) {
      console.error("Error fetching product:", error);
    }

    
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  editProduct(id,formData)
  };

  const onCancel = () => {
    const res = confirm("Are You Sure Want To Cancel..!")
    if (res) {
      navigate("/admin/products")
    }
  }


return (
  <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
            <option value="gravy">Gravy</option>
            <option value="fastfood">FastFood</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default EditProduct
