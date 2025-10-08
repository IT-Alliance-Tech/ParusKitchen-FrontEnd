import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMeals: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin not logged in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, mealsRes, ordersRes, revenueRes] = await Promise.all([
          axios.get("/api/admin-dashboard/total-users", { headers }),
          axios.get("/api/admin-dashboard/total-meals", { headers }),
          axios.get("/api/admin-dashboard/total-orders", { headers }),
          axios.get("/api/admin-dashboard/revenue", { headers }),
        ]);

        setStats({
          totalUsers: usersRes.data.totalUsers || 0,
          totalMeals: mealsRes.data.totalMeals || 0,
          totalOrders: ordersRes.data.totalOrders || 0,
          revenue: revenueRes.data.revenue || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to fetch dashboard data.");
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
        <StatCard title="Total Meals" value={stats.totalMeals} color="green" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="purple" />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          color="orange"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div
    className={`bg-white shadow-lg rounded-2xl p-6 border-t-4 border-${color}-500`}
  >
    <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
