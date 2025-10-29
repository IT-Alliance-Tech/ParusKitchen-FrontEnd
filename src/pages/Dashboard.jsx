// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getCurrentSubscription,
  getUpcomingMenu,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  renewSubscription,
  getInvoices,
  updateProfile,
} from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [upcomingMenu, setUpcomingMenu] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  // Fetch everything when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [subData, menuData, invoiceData] = await Promise.all([
          getCurrentSubscription(),
          getUpcomingMenu(),
          getInvoices(),
        ]);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setFormData({
            name: parsedUser.name || "",
            phone: parsedUser.phone || "",
            address: parsedUser.address || "",
          });
        }

        setSubscription(subData || null);
        setUpcomingMenu(menuData || []);
        setInvoices(invoiceData || []);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers for subscription actions
  const handlePause = async () => {
    await pauseSubscription();
    alert("Subscription paused successfully!");
    window.location.reload();
  };

  const handleResume = async () => {
    await resumeSubscription();
    alert("Subscription resumed successfully!");
    window.location.reload();
  };

  const handleCancel = async () => {
    await cancelSubscription();
    alert("Subscription cancelled successfully!");
    window.location.reload();
  };

  const handleRenew = async () => {
    await renewSubscription();
    alert("Subscription renewed successfully!");
    window.location.reload();
  };

  const handleSave = async () => {
    try {
      const updated = await updateProfile(formData);
      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(updated.user));
      setUser(updated.user);
      setEditMode(false);
    } catch (err) {
      alert("Error updating profile!");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-700 text-lg">
        Loading your dashboard...
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">
        Welcome back, {user?.name || "User"} 👋
      </h1>

      {/* ================= CURRENT SUBSCRIPTION ================= */}
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
              <strong>Duration:</strong>{" "}
              {new Date(subscription.startDate).toLocaleDateString()} →{" "}
              {new Date(subscription.endDate).toLocaleDateString()}
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

            <div className="flex flex-wrap gap-3">
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

      {/* ================= UPCOMING MENU ================= */}
      <section className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Menu</h2>
        {upcomingMenu.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {upcomingMenu.map((item, index) => (
              <li key={index}>
                <strong>{new Date(item.date).toLocaleDateString()}:</strong>{" "}
                {item.mealName} ({item.planType})
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming menu available.</p>
        )}
      </section>

      {/* ================= PAYMENT HISTORY ================= */}
      <section className="bg-white shadow rounded-xl p-6 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        {invoices.length > 0 ? (
          <table className="min-w-full border text-left text-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i}>
                  <td className="p-3 border">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">₹{inv.amount}</td>
                  <td className="p-3 border">
                    <a
                      href={inv.invoiceLink}
                      className="text-blue-600 hover:underline"
                    >
                      View / Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payment history found.</p>
        )}
      </section>

      {/* ================= PROFILE / CONTACT INFO ================= */}
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Delivery Address & Contact Info
        </h2>

        {editMode ? (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your name"
            />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter contact number"
            />
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your address"
              rows={3}
            />
            <div className="flex gap-3">
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
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {user?.address}
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
