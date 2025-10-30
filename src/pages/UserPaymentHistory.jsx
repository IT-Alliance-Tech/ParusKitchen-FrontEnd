import React from "react";

export default function UserPaymentHistory() {
  const invoices = [
    { id: "INV001", date: "2025-10-20", plan: "Lunch + Dinner", amount: 5750, mode: "Razorpay", status: "Paid" },
    { id: "INV002", date: "2025-09-20", plan: "Lunch Only", amount: 3000, mode: "UPI", status: "Paid" },
    { id: "INV003", date: "2025-08-20", plan: "Breakfast Only", amount: 1800, mode: "Card", status: "Pending" },
  ];

  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const grandTotal = invoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-primary-800">My Payments &amp; Billing</h1>

        {/* Summary Card */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-700">
            <strong>Total Payments:</strong> ₹{grandTotal} &nbsp; | &nbsp;
            <strong>Pending:</strong> ₹{totalPending}
          </p>
        </div>

        {/* Filters (UI only) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md border bg-white text-sm">All</button>
            <button className="px-3 py-1 rounded-md border bg-white text-sm">Paid</button>
            <button className="px-3 py-1 rounded-md border bg-white text-sm">Pending</button>
          </div>

          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{invoices.length}</span> invoices
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Invoice ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Plan Name</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment Mode</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Download</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.plan}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">₹{inv.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.mode}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={
                        inv.status === "Paid"
                          ? "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          : "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                      }
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {/* Non-functional download button */}
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-sm bg-white hover:bg-gray-50"
                      onClick={() => alert(`Download invoice ${inv.id} (static demo)`)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Footer summary row (optional) */}
            <tfoot>
              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-700">Summary</td>
                <td className="px-4 py-3 text-sm font-semibold text-right">₹{grandTotal}</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Small help text */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          This is a static demo page. Integrate with your backend to show real invoices and enable actual downloads.
        </div>
      </div>
    </div>
  );
}
