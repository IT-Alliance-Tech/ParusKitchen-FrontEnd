import React, { useState } from "react";

export default function AdminDeliveryPage() {
  const [deliveries, setDeliveries] = useState([
    { name: "Ravi Kumar", address: "Bangalore", status: "Pending" },
    { name: "Anita Rao", address: "Mysore", status: "Delivered" },
    { name: "Kiran Patil", address: "Chennai", status: "Pending" },
    { name: "Meera Iyer", address: "Hyderabad", status: "Delivered" },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredDeliveries =
    filter === "All"
      ? deliveries
      : deliveries.filter((d) => d.status === filter);

  const toggleStatus = (index) => {
    const updated = [...deliveries];
    updated[index].status =
      updated[index].status === "Delivered" ? "Pending" : "Delivered";
    setDeliveries(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          🚚 Delivery Management
        </h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow">
          Export Data
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Delivered", "Pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === type
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((d, index) => (
            <div
              key={d.name}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="font-semibold text-gray-800">{d.name}</div>
                <div className="text-sm text-gray-500">{d.address}</div>
              </div>

              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    d.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {d.status}
                </span>

                <button
                  onClick={() => toggleStatus(index)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                >
                  Mark {d.status === "Delivered" ? "Pending" : "Delivered"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No deliveries found for <b>{filter}</b> status.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-10">
        Tip: Track and manage your delivery statuses here.
      </div>
    </div>
  );
}
