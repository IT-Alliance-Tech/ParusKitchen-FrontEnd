// src/pages/Deliveries.jsx
import React from "react";

const Deliveries = () => {
  const deliveries = [
    { id: 1, name: "Rahul Sharma", address: "BTM Layout", status: "Delivered" },
    { id: 2, name: "Sneha Patil", address: "JP Nagar", status: "Pending" },
    { id: 3, name: "Amit Kumar", address: "HSR Layout", status: "Delivered" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-800 text-center">Deliveries Today</h1>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-100 text-left">
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id} className="hover:bg-gray-100">
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border">{d.address}</td>
                <td className={`p-3 border font-semibold ${d.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                  {d.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deliveries;
