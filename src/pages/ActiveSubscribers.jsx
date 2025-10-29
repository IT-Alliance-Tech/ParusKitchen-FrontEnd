// src/pages/ActiveSubscribers.jsx
import React from "react";

const ActiveSubscribers = () => {
  const subscribers = [
    { id: 1, name: "Rahul Sharma", plan: "Lunch + Dinner", status: "Active", renewal: "Nov 15, 2025" },
    { id: 2, name: "Sneha Patil", plan: "Breakfast + Lunch + Dinner", status: "Active", renewal: "Nov 20, 2025" },
    { id: 3, name: "Amit Kumar", plan: "Lunch/Dinner Only", status: "Active", renewal: "Nov 10, 2025" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-800 text-center">Active Subscribers</h1>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Plan</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-100">
                <td className="p-3 border">{sub.name}</td>
                <td className="p-3 border">{sub.plan}</td>
                <td className="p-3 border text-green-600 font-semibold">{sub.status}</td>
                <td className="p-3 border">{sub.renewal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveSubscribers;
