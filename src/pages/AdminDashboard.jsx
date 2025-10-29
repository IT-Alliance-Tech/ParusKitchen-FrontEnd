// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getAdminTotalOrders,
  getAdminTotalMeals,
  getAdminTotalUsers,
  getAdminRevenue,
} from "../api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [totals, setTotals] = useState({
    orders: 0,
    meals: 0,
    users: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true);
      setError("");

      try {
        const [orders, meals, users, revenue] = await Promise.all([
          getAdminTotalOrders(),
          getAdminTotalMeals(),
          getAdminTotalUsers(),
          getAdminRevenue(),
        ]);

        setTotals({
          orders: orders.totalOrders || 0,
          meals: meals.totalMeals || 0,
          users: users.totalUsers || 0,
          revenue: revenue.totalRevenue || 0,
        });
      } catch (err) {
        console.error("Error fetching admin totals:", err);
        setError(err.message || "Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading admin dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div
          onClick={() => navigate("/admin/orders")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.orders}</p>
        </div>

        {/* Total Meals */}
        <div
          onClick={() => navigate("/admin/meals")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Total Meals</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.meals}</p>
        </div>

        {/* Total Users */}
        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.users}</p>
        </div>

        {/* Revenue */}
        <div
          onClick={() => navigate("/admin/revenue")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-primary-600">
            ₹{totals.revenue.toLocaleString()}
          </p>
        </div>

        {/* Active Subscribers */}
        <div
          onClick={() => navigate("/active-subscribers")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Active Subscribers</h2>
          <p className="text-3xl font-bold text-primary-600">52</p>
        </div>

        {/* Deliveries */}
        <div
          onClick={() => navigate("/deliveries")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Deliveries Today</h2>
          <p className="text-3xl font-bold text-primary-600">145</p>
        </div>

        {/* Expiring Subscriptions */}
        <div
          onClick={() => navigate("/expiring-subscriptions")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Expiring Soon</h2>
          <p className="text-3xl font-bold text-primary-600">8</p>
        </div>

        {/* Monthly Reports */}
        <div
          onClick={() => navigate("/reports")}
          className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">Monthly Reports</h2>
          <p className="text-3xl font-bold text-primary-600">View</p>
        </div>
        {/* Subscriber Management */}
      <div
  onClick={() => navigate("/admin/subscribers")}
  className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
>
  <h2 className="text-lg font-semibold mb-2">Subscriber Management</h2>
  <p className="text-3xl font-bold text-primary-600">Manage</p>
</div>
{/* Settings Page (Static) */}
<div
  onClick={() => navigate("/admin/settings")}
  className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
>
  <h2 className="text-lg font-semibold mb-2">Settings</h2>
  <p className="text-3xl font-bold text-primary-600">⚙️</p>
</div>


      </div>
    </div>
  );
};

export default AdminDashboard;
