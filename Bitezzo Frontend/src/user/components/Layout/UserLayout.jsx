import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../NavBar/Nav"
import Footer from "../Footer/Footer";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
     
      <Nav />
      <main className="flex-1 w-full bg-gray-100">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default UserLayout;
