// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminTotalOrders,
  getAdminTotalMeals,
  getAdminTotalUsers,
  getAdminRevenue,
} from "../api";

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
        <div className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate("/admin/orders")}>
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.orders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate("/admin/meals")}>
          <h2 className="text-lg font-semibold mb-2">Total Meals</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.meals}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer" onClick={() => navigate("/admin/users")}>
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-primary-600">{totals.users}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-primary-600">
            ₹{totals.revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
