import React from "react";

export default function AdminPaymentPage() {
  const payments = [
    { date: "2025-10-29", user: "Ravi Kumar", amount: 500, status: "Paid", mode: "UPI" },
    { date: "2025-10-28", user: "Anita Rao", amount: 300, status: "Failed", mode: "Card" },
    { date: "2025-10-28", user: "Kiran Patil", amount: 700, status: "Pending", mode: "Cash" },
  ];

  const filterButtons = ["All", "Paid", "Failed", "Pending"];

  return (
    <div style={{ padding: 24, background: "#f6f7fb", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Payment Management</h2>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {filterButtons.map((f) => (
          <button key={f} style={{ padding: "8px 12px", borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer" }}>
            {f}
          </button>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            <th style={{ textAlign: "left", padding: 10, fontSize: 14 }}>Date</th>
            <th style={{ textAlign: "left", padding: 10, fontSize: 14 }}>User</th>
            <th style={{ textAlign: "left", padding: 10, fontSize: 14 }}>Amount</th>
            <th style={{ textAlign: "left", padding: 10, fontSize: 14 }}>Status</th>
            <th style={{ textAlign: "left", padding: 10, fontSize: 14 }}>Mode</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: 10 }}>{p.date}</td>
              <td style={{ padding: 10 }}>{p.user}</td>
              <td style={{ padding: 10 }}>₹{p.amount}</td>
              <td style={{ padding: 10 }}>{p.status}</td>
              <td style={{ padding: 10 }}>{p.mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
