// src/pages/SubscriberManagement.jsx
import React, { useState } from "react";

const SubscriberManagement = () => {
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      plan: "Lunch + Dinner",
      status: "Active",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      deliveryMode: "Home Delivery",
    },
    {
      id: 2,
      name: "Sneha Patel",
      plan: "Breakfast + Lunch + Dinner",
      status: "Paused",
      startDate: "2025-09-20",
      endDate: "2025-10-20",
      deliveryMode: "Pickup",
    },
    {
      id: 3,
      name: "Vikram Nair",
      plan: "Lunch Only",
      status: "Expired",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      deliveryMode: "Home Delivery",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredSubscribers =
    filter === "All"
      ? subscribers
      : subscribers.filter((sub) => sub.status === filter);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary-800">
        Subscriber Management
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <select
          className="border rounded-md px-4 py-2 w-full sm:w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Subscribers</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Expired">Expired</option>
        </select>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
          + Add New Subscriber
        </button>
      </div>

      {/* Subscriber Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border">
          <thead className="bg-primary-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Plan</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Start Date</th>
              <th className="py-3 px-4 border-b text-left">End Date</th>
              <th className="py-3 px-4 border-b text-left">Delivery Mode</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{sub.name}</td>
                <td className="py-3 px-4 border-b">{sub.plan}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    sub.status === "Active"
                      ? "text-green-600"
                      : sub.status === "Paused"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {sub.status}
                </td>
                <td className="py-3 px-4 border-b">{sub.startDate}</td>
                <td className="py-3 px-4 border-b">{sub.endDate}</td>
                <td className="py-3 px-4 border-b">{sub.deliveryMode}</td>
                <td className="py-3 px-4 border-b text-center">
                  <button className="text-blue-600 hover:underline mr-2">
                    Pause
                  </button>
                  <button className="text-green-600 hover:underline mr-2">
                    Resume
                  </button>
                  <button className="text-red-600 hover:underline mr-2">
                    Cancel
                  </button>
                  <button className="text-indigo-600 hover:underline">
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberManagement;
