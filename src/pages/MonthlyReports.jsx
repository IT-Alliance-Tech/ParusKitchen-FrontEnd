// src/pages/MonthlyReports.jsx
import React from "react";

const MonthlyReports = () => {
  const report = {
    month: "October 2025",
    totalOrders: 320,
    totalRevenue: "₹1,85,000",
    newSubscribers: 28,
    renewals: 40,
    deliveriesCompleted: 310,
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary-800 text-center">Monthly Report - {report.month}</h1>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto space-y-4">
        <p className="text-lg"><strong>Total Orders:</strong> {report.totalOrders}</p>
        <p className="text-lg"><strong>Total Revenue:</strong> {report.totalRevenue}</p>
        <p className="text-lg"><strong>New Subscribers:</strong> {report.newSubscribers}</p>
        <p className="text-lg"><strong>Renewals:</strong> {report.renewals}</p>
        <p className="text-lg"><strong>Deliveries Completed:</strong> {report.deliveriesCompleted}</p>
      </div>
    </div>
  );
};

export default MonthlyReports;
