import React, { useState } from "react";

export default function AdminPaymentPage() {
  const [payments, setPayments] = useState([
    { date: "2025-10-29", user: "Ravi Kumar", amount: 500, status: "Paid", mode: "UPI" },
    { date: "2025-10-28", user: "Anita Rao", amount: 300, status: "Failed", mode: "Card" },
    { date: "2025-10-28", user: "Kiran Patil", amount: 700, status: "Pending", mode: "Cash" },
    { date: "2025-10-27", user: "Meera Iyer", amount: 900, status: "Paid", mode: "Razorpay" },
  ]);

  const [filter, setFilter] = useState("All");

  const filterButtons = ["All", "Paid", "Failed", "Pending"];

  const filteredPayments =
    filter === "All" ? payments : payments.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          💳 Payment Management
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filterButtons.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Mode
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPayments.map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-sm text-gray-700">{p.date}</td>
                <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                  {p.user}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">₹{p.amount}</td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">{p.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        Tip: Use filters to quickly view transaction statuses.
      </div>
    </div>
  );
}
