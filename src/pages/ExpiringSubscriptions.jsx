// src/pages/ExpiringSubscriptions.jsx
import React from "react";

const ExpiringSubscriptions = () => {
  const expiring = [
    { id: 1, name: "Kiran Rao", plan: "Lunch + Dinner", expiry: "Oct 30, 2025" },
    { id: 2, name: "Manish Verma", plan: "Breakfast Only", expiry: "Nov 1, 2025" },
    { id: 3, name: "Deepa Nair", plan: "Lunch/Dinner Only", expiry: "Nov 3, 2025" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-800 text-center">Expiring Soon</h1>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Plan</th>
              <th className="p-3 border">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {expiring.map((e) => (
              <tr key={e.id} className="hover:bg-gray-100">
                <td className="p-3 border">{e.name}</td>
                <td className="p-3 border">{e.plan}</td>
                <td className="p-3 border text-red-600 font-semibold">{e.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpiringSubscriptions;
