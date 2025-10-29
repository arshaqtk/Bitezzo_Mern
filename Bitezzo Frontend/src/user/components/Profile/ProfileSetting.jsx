import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Axios_instance from '../../../api/axiosConfig';
import { AuthContext } from '../../../context/AuthContext';
import {Lock,Eye,EyeOff,Settings,Bell,Shield} from "lucide-react";

function ProfileSetting() {
    const { auth } = useContext(AuthContext)
 
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });



    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value.trim() }));
    };
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                toast.error("New passwords don't match");
                return;
            }

            if (passwordData.newPassword.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
            }

            const response = await Axios_instance.get(`/users?id=${auth.id}`);
            const userData = response.data[0];

            if (userData.password !== passwordData.currentPassword) {
                toast.error("Current password is incorrect");
                return;
            }

            await Axios_instance.patch(`/users/${auth.id}`, {
                password: passwordData.newPassword,
            });

            toast.success("Password updated successfully!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to update password");
        }
    };
    return (
        
                <div className="space-y-6">

                    {/* Change Password */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <Lock className="w-6 h-6" />
                                Change Password
                            </h2>

                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.current ? 'text' : 'password'}
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            required
                                            className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('current')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword.new ? 'text' : 'password'}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                required
                                                className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('new')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword.confirm ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                required
                                                className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors duration-200"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Account Settings */}
                    {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <Settings className="w-6 h-6" />
                                Account Settings
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between py-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Email Notifications</p>
                                            <p className="text-sm text-gray-600">Receive updates about your orders</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                                        Enable
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
    )
}

export default ProfileSetting