import React, { useState } from "react";
import {
  Download,
  CreditCard,
  Clock,
  CheckCircle,
  X,
  Smartphone,
  Wallet,
} from "lucide-react";

export default function UserPaymentHistory() {
  const invoices = [
    {
      id: "INV001",
      date: "2025-10-20",
      plan: "Lunch + Dinner",
      amount: 5750,
      mode: "Razorpay",
      status: "Paid",
    },
    {
      id: "INV002",
      date: "2025-09-20",
      plan: "Lunch Only",
      amount: 3000,
      mode: "UPI",
      status: "Paid",
    },
    {
      id: "INV003",
      date: "2025-08-20",
      plan: "Breakfast Only",
      amount: 1800,
      mode: "Card",
      status: "Pending",
    },
  ];

  const [filter, setFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices =
    filter === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.amount, 0);

  const totalPending = invoices
    .filter((i) => i.status === "Pending")
    .reduce((s, i) => s + i.amount, 0);

  const grandTotal = invoices.reduce((s, i) => s + i.amount, 0);

  const getModeIcon = (mode) => {
    switch (mode) {
      case "UPI":
        return <Smartphone className="w-4 h-4 text-pink-500" />;
      case "Card":
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      default:
        return <Wallet className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-8 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-indigo-600" /> Payment History
          </h1>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            View and manage your payments below.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <SummaryCard title="Total Paid" value={totalPaid} color="green" />
          <SummaryCard title="Pending" value={totalPending} color="yellow" />
          <SummaryCard title="Total Spent" value={grandTotal} color="indigo" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
          <div className="flex gap-2">
            {["All", "Paid", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
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
            Showing {filteredInvoices.length} record(s)
          </span>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Invoice", "Date", "Plan", "Amount", "Mode", "Status", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
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
                  <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                    ₹{inv.amount}
                  </td>
                  <td className="px-6 py-3 text-sm flex items-center gap-2 text-gray-600">
                    {getModeIcon(inv.mode)}
                    {inv.mode}
                  </td>
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
                      onClick={() => setSelectedInvoice(inv)}
                      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
                    >
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Tip */}
        <div className="mt-6 text-center text-sm text-gray-500">
          💡 Tip: Connect your Supabase or Razorpay API to sync real payment data.
        </div>
      </div>

      {/* Download Modal */}
      {selectedInvoice && (
        <Modal onClose={() => setSelectedInvoice(null)}>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Download Invoice
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Would you like to download invoice{" "}
              <span className="font-medium">{selectedInvoice.id}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setTimeout(() => {
                    alert(`Invoice ${selectedInvoice.id} downloaded!`);
                    setSelectedInvoice(null);
                  }, 500);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
              >
                Download PDF
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Reusable SummaryCard component
function SummaryCard({ title, value, color }) {
  const colorClasses = {
    green: "text-green-600 border-green-100 bg-green-50",
    yellow: "text-yellow-600 border-yellow-100 bg-yellow-50",
    indigo: "text-indigo-600 border-indigo-100 bg-indigo-50",
  }[color];

  return (
    <div
      className={`border shadow-sm rounded-xl p-5 hover:shadow-md transition-all ${colorClasses}`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold mt-1">₹{value}</h2>
    </div>
  );
}

// Simple Modal
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
