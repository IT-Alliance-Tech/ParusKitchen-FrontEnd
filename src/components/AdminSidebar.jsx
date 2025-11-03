import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Total Orders", path: "/admin/orders" },
  { name: "Total Meals", path: "/admin/meals" },
  { name: "Total Users", path: "/admin/users" },
  { name: "Revenue", path: "/admin/revenue" },
  { name: "Active Subscribers", path: "/admin/subscribers" },
  // Add more menu items here as needed
];

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-60`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button
            className="lg:hidden text-white"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 text-sm font-medium hover:bg-gray-700 transition-colors ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
              onClick={toggleSidebar}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
