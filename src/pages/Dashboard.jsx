// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [upcomingMenu, setUpcomingMenu] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ address: "", contact: "" });

  useEffect(() => {
    // Dummy mock data for now
    const dummyData = {
      user: {
        name: "Hrudhay",
        email: "hrudhay@example.com",
        address: "Bangalore, India",
        contact: "+91 9876543210",
      },
      subscription: {
        planName: "Premium Weekly Plan",
        price: 1499,
        startDate: "2025-10-20",
        endDate: "2025-10-27",
        status: "active",
        remainingDays: 2,
      },
      upcomingMenu: [
        { day: "Monday", meal: "Paneer Butter Masala with Roti" },
        { day: "Tuesday", meal: "Veg Biryani with Raita" },
        { day: "Wednesday", meal: "Rajma Chawal" },
      ],
      payments: [
        {
          id: "INV001",
          date: "2025-10-20",
          amount: 1499,
          status: "Paid",
        },
        {
          id: "INV002",
          date: "2025-09-20",
          amount: 1499,
          status: "Paid",
        },
      ],
    };

    setTimeout(() => {
      setUser(dummyData.user);
      setSubscription(dummyData.subscription);
      setUpcomingMenu(dummyData.upcomingMenu);
      setPayments(dummyData.payments);
      setFormData({
        address: dummyData.user.address,
        contact: dummyData.user.contact,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handlePause = () => alert("Subscription paused (mock)");
  const handleResume = () => alert("Subscription resumed (mock)");
  const handleCancel = () => alert("Subscription cancelled (mock)");
  const handleRenew = () => alert("Subscription renewed (mock)");
  const handleSave = () => {
    alert("Profile updated (mock)");
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-700 text-lg">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">
        Welcome back, {user?.name} 👋
      </h1>

      {/* Current Subscription */}
      <section className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Subscription</h2>
        {subscription ? (
          <>
            <p className="text-gray-700 mb-1">
              <strong>Plan:</strong> {subscription.planName}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Price:</strong> ₹{subscription.price}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Duration:</strong> {subscription.startDate} →{" "}
              {subscription.endDate}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Remaining Days:</strong> {subscription.remainingDays}
            </p>
            <p
              className={`inline-block px-3 py-1 rounded text-white mb-4 ${
                subscription.status === "active"
                  ? "bg-green-600"
                  : subscription.status === "paused"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
            >
              {subscription.status.toUpperCase()}
            </p>

            <div className="space-x-3">
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Pause
              </button>
              <button
                onClick={handleResume}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Resume
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleRenew}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Renew
              </button>
            </div>
          </>
        ) : (
          <p>No active subscription found.</p>
        )}
      </section>

      {/* Upcoming Menu */}
      <section className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Menu</h2>
        {upcomingMenu.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-700">
            {upcomingMenu.map((item, index) => (
              <li key={index} className="mb-1">
                <strong>{item.day}:</strong> {item.meal}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming menu available.</p>
        )}
      </section>

      {/* Payment History */}
      <section className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        {payments.length > 0 ? (
          <table className="w-full border text-left text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Invoice ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 border">{p.id}</td>
                  <td className="p-3 border">{p.date}</td>
                  <td className="p-3 border">₹{p.amount}</td>
                  <td className="p-3 border">{p.status}</td>
                  <td className="p-3 border">
                    <button className="text-blue-600 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payment history found.</p>
        )}
      </section>

      {/* Profile / Contact Info */}
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Delivery Address & Contact Info
        </h2>

        {editMode ? (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Enter new address"
            />
            <input
              type="text"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Enter new contact"
            />
            <div className="space-x-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Contact:</strong> {user.contact}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
