import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white py-4 px-6 shadow-md flex justify-between items-center lg:hidden">
          <button
            className="text-gray-700 text-2xl"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
