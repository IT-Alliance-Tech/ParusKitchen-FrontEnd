import React, { useState } from "react";
import { Search, CreditCard, ArrowUpCircle, AlertTriangle, Clock } from "lucide-react";

export default function AdminPaymentPage() {
  const [payments] = useState([
    { date: "2025-10-29", user: "Ravi Kumar", amount: 500, status: "Paid", mode: "UPI" },
    { date: "2025-10-28", user: "Anita Rao", amount: 300, status: "Failed", mode: "Card" },
    { date: "2025-10-28", user: "Kiran Patil", amount: 700, status: "Pending", mode: "Cash" },
    { date: "2025-10-27", user: "Meera Iyer", amount: 900, status: "Paid", mode: "Razorpay" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filterButtons = ["All", "Paid", "Failed", "Pending"];

  const filteredPayments = payments.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch = p.user.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
          <CreditCard className="text-indigo-600" size={28} />
          Payment Management
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition text-center">
          <p className="text-gray-500 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{payments.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition text-center">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600 mt-1">₹{totalRevenue}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition text-center">
          <p className="text-gray-500 text-sm">Pending Payments</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {payments.filter((p) => p.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-3">
          {filterButtons.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50/40 transition-all duration-200"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">{p.date}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">
                    {p.user}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700 font-semibold">
                    ₹{p.amount}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status === "Paid" && <ArrowUpCircle size={12} />}
                      {p.status === "Failed" && <AlertTriangle size={12} />}
                      {p.status === "Pending" && <Clock size={12} />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">{p.mode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-6 italic bg-gray-50"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-10">
        Tip: Filter or search payments to quickly analyze transaction data.
      </div>
    </div>
  );
}
