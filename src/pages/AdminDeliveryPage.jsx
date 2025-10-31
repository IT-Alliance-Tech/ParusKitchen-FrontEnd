import React from "react";

export default function AdminDeliveryPage() {
  const deliveries = [
    { name: "Ravi Kumar", address: "Bangalore", status: "Pending" },
    { name: "Anita Rao", address: "Mysore", status: "Delivered" },
    { name: "Kiran Patil", address: "Chennai", status: "Pending" },
  ];

  return (
    <div style={{ padding: 24, background: "#f6f7fb", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Delivery Management</h2>
        <button style={{ padding: "8px 12px", borderRadius: 6, background: "#4f46e5", color: "#fff", border: 0, cursor: "pointer" }}>Export</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {deliveries.map((d) => (
          <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: 14, borderRadius: 8, border: "1px solid #e6e9ef" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{d.name}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{d.address}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: d.status === "Delivered" ? "#ecfdf5" : "#fffbeb",
                  color: d.status === "Delivered" ? "#065f46" : "#78350f",
                  fontSize: 12,
                }}
              >
                {d.status}
              </span>
              <button style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
                Mark {d.status === "Delivered" ? "Pending" : "Delivered"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
