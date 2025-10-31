import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { ProductContext } from "../../context/ProductContext";
import { XCircle } from "lucide-react";
import { editProduct } from "../services/adminProductApi";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    category: "",
    count: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios_instance.get(`/products/${id}`);
        const productData =   Array.isArray(response.data) ? response.data[0] : response.data;
        setProduct(productData);

       
        let imagesArr = [];
        if (productData?.images) {
          if (Array.isArray(productData.images)) imagesArr = productData.images;
          else if (typeof productData.images === "string") imagesArr = [productData.images];
        }
        setFormData({
          name: productData?.name || "",
          description: productData?.description || "",
          price: productData?.price || "",
          images: imagesArr,
          category: productData?.category || "",
          count: productData?.count || "",
        });
        setImagePreviews(imagesArr);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    if (id) fetchData();
  }, [id]);

  // For file uploading and previewing
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const fileArr = Array.from(files);
      const newPreviews = fileArr.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArr], // add new files to images array
      }));
      setImagePreviews(prev => [...prev, ...newPreviews]); // add previews
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Remove image by index
  const handleRemoveImage = (idxToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idxToRemove),
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== idxToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((img) => data.append("images", img));
      } else {
        data.append(key, formData[key]);
      }
    });
    try {
     const response= await editProduct(id, data);
     if(response.success){
      toast.success("Product updated!");
      navigate("/admin/products");
    }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const onCancel = () => {
    const res = window.confirm("Are You Sure Want To Cancel..!");
    if (res) navigate("/admin/products");
  };

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
                name="count"
                value={formData.count}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Image upload and preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload images from device. Remove any unwanted images below before submitting.
            </p>
            {imagePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img
                     src={src.url || src}
                      alt={`Preview ${idx + 1}`}
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 shadow group-hover:opacity-100 opacity-80"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove Image"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>
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

export default EditProduct;
