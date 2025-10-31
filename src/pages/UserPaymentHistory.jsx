import React, { useState } from "react";
import { Download, CreditCard, Clock, CheckCircle } from "lucide-react";

export default function UserPaymentHistory() {
  const invoices = [
    { id: "INV001", date: "2025-10-20", plan: "Lunch + Dinner", amount: 5750, mode: "Razorpay", status: "Paid" },
    { id: "INV002", date: "2025-09-20", plan: "Lunch Only", amount: 3000, mode: "UPI", status: "Paid" },
    { id: "INV003", date: "2025-08-20", plan: "Breakfast Only", amount: 1800, mode: "Card", status: "Pending" },
  ];

  const [filter, setFilter] = useState("All");

  const filteredInvoices =
    filter === "All" ? invoices : invoices.filter((inv) => inv.status === filter);

  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices
    .filter((i) => i.status === "Pending")
    .reduce((s, i) => s + i.amount, 0);
  const grandTotal = invoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-8 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-indigo-600" /> My Payments
          </h1>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            Manage your recent transactions and download invoices.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all">
            <p className="text-sm text-gray-500">Total Paid</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">₹{totalPaid}</h2>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold text-yellow-600 mt-1">₹{totalPending}</h2>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all">
            <p className="text-sm text-gray-500">Total Transactions</p>
            <h2 className="text-2xl font-bold text-indigo-600 mt-1">₹{grandTotal}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-2">
            {["All", "Paid", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === status
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            Showing {filteredInvoices.length} invoice(s)
          </span>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-indigo-50/40 transition cursor-default"
                >
                  <td className="px-6 py-3 text-sm font-medium text-gray-700">
                    {inv.id}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{inv.date}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{inv.plan}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-right text-gray-800">
                    ₹{inv.amount}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{inv.mode}</td>
                  <td className="px-6 py-3 text-sm">
                    {inv.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle size={12} /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => alert(`Downloading invoice ${inv.id}...`)}
                      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
                    >
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-3 text-sm font-medium text-gray-700"
                >
                  Total Summary
                </td>
                <td className="px-6 py-3 text-sm font-semibold text-right text-indigo-700">
                  ₹{grandTotal}
                </td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer Help */}
        <div className="mt-6 text-center text-sm text-gray-500">
          💡 Tip: Connect your backend API to dynamically fetch real payment data
          and enable downloadable invoices.
        </div>
      </div>
    </div>
  );
}
