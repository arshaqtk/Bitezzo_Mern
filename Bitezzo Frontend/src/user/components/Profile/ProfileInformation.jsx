import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import Axios_instance from '../../../api/axiosConfig';
import toast from 'react-hot-toast';
import {User, Mail,MapPin,Edit3,Save,X,Phone} from "lucide-react";

function ProfileInformation() {
        const { user,updateUser } = useContext(AuthContext)
        

      const [editMode, setEditMode] = useState(false);
      const [profileData, setProfileData] = useState({
          username: user.username || '',
          email: user.email || '',
        //   phone: user.phone || '',
        //   shippingAddress: user.shippingAddress || '',
        });
        console.log(user.phone)

    useEffect(()=>{
         const fetchData=async ()=>{
              const response = await Axios_instance.get(`/users?id=${user.id}`);
                     const userData = response.data[0];      
                      setProfileData(userData)
                      console.log(userData)
        
            }
            fetchData()
    },[])
       const handleProfileChange = (e) => {
          const { name, value } = e.target;
          setProfileData(prev => ({ ...prev, [name]: value }));
        };
      
        const handleProfileSubmit = async (e) => {
          e.preventDefault();
          try {
            await Axios_instance.patch(`/users/${user.id}`, profileData);
            updateUser({ ...user, ...profileData });
            toast.success("Profile updated successfully!");
            setEditMode(false);
          } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
          }
        };
    
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors duration-200"
                    >
                      {editMode ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      {editMode ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={profileData.username}
                          onChange={handleProfileChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors duration-200"
                        />
                      </div>
                      
                      {/* <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          disabled={!editMode}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors duration-200"
                        />
                      </div> */}
                      
                    
                      
                      {/* <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4" />
                          Birth Date
                        </label>
                        <input
                          type="date"
                          name="birthdate"
                          value={profileData.birthdate}
                          onChange={handleProfileChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 transition-colors duration-200"
                        />
                      </div> */}
                    </div>
                    
                    {/* <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        value={profileData.shippingAddress}
                        onChange={handleProfileChange}
                        disabled={!editMode}
                        placeholder="Enter your address"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={3}
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        disabled={!editMode}
                        placeholder="Tell us about yourself"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none transition-colors duration-200"
                      />
                    </div> */}
                    
                    {editMode && (
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors duration-200"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
  )
}

export default ProfileInformation