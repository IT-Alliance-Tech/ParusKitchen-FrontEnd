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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span>🚚</span> Delivery Management
        </h2>
        <button className="mt-4 sm:mt-0 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md">
          Export Data
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center sm:justify-start">
        {["All", "Delivered", "Pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm ${
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
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                  {d.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    {d.name}
                  </div>
                  <div className="text-sm text-gray-500">{d.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    d.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {d.status}
                </span>

                <button
                  onClick={() => toggleStatus(index)}
                  className="px-4 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:text-indigo-800 transition-all"
                >
                  Mark {d.status === "Delivered" ? "Pending" : "Delivered"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl shadow-inner">
            No deliveries found for <b>{filter}</b> status.
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
          <p className="text-gray-500 text-sm">Total Deliveries</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {deliveries.length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
          <p className="text-gray-500 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {deliveries.filter((d) => d.status === "Delivered").length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border text-center">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {deliveries.filter((d) => d.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-12">
        Tip: Manage delivery statuses and track performance easily from this
        dashboard.
      </div>
    </div>
  );
}
