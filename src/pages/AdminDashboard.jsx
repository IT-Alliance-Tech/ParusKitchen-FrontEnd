// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getAdminTotalOrders,
  getAdminTotalMeals,
  getAdminTotalUsers,
  getAdminRevenue,
} from "../api";
import { useNavigate } from "react-router-dom";   
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
);


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
{/* Communication & Automation (Static) */}
<div
  onClick={() => navigate("/admin/communication")}
  className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition"
>
  <h2 className="text-lg font-semibold mb-2">Communication & Automation</h2>
  <p className="text-3xl font-bold text-primary-600">Open</p>
</div>




      </div>
      {/* Reports & Graphs Section */}
<div className="mt-12 bg-white p-8 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-primary-800 text-center">
    Reports & Analytics
  </h2>

  {/* Charts Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Monthly Revenue Line Chart */}
    <div className="h-[250px] flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Monthly Revenue Overview
      </h3>
      <div className="w-full max-w-[400px] h-[180px]">
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [
              {
                label: "Revenue (₹)",
                data: [40000, 55000, 70000, 50000, 85000, 95000, 120000],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
            scales: {
              y: { ticks: { stepSize: 20000 } },
            },
          }}
        />
      </div>
    </div>

    {/* Orders by Meal Type - Bar Chart */}
    <div className="h-[250px] flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Orders by Meal Type
      </h3>
      <div className="w-full max-w-[400px] h-[180px]">
        <Bar
          data={{
            labels: ["Breakfast", "Lunch", "Dinner"],
            datasets: [
              {
                label: "Orders",
                data: [120, 250, 180],
                backgroundColor: [
                  "rgba(255,99,132,0.6)",
                  "rgba(54,162,235,0.6)",
                  "rgba(255,206,86,0.6)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  </div>

  {/* Subscription Distribution - Pie Chart */}
  <div className="mt-10 flex justify-center">
    <div className="w-[250px] h-[250px]">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Subscription Type Distribution
      </h3>
      <Pie
        data={{
          labels: ["Weekly", "Monthly", "Quarterly"],
          datasets: [
            {
              data: [30, 50, 20],
              backgroundColor: [
                "rgba(255,159,64,0.7)",
                "rgba(153,102,255,0.7)",
                "rgba(255,205,86,0.7)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
