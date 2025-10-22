import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../component/TopBar";
import Sidebar from "../component/SideBar";


function AdminInterface() {
return (
  <div className="flex h-screen">
    <Sidebar />
    {/* <TopBar/> */}
    <div 
      className="flex-1 p-6 
      bg-gray-50 
      overflow-y-auto"
    >
      <Outlet /> 
    </div>
  </div>
);

}

export default AdminInterface;
