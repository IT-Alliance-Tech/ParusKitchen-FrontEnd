import React from "react";

export default function AdminMenuPage() {
  const meals = [
    { type: "Breakfast", items: ["Idli", "Dosa", "Poha"] },
    { type: "Lunch", items: ["Veg Biryani", "Dal Rice", "Chapati"] },
    { type: "Dinner", items: ["Paneer Curry", "Jeera Rice", "Roti"] },
  ];

  return (
    <div style={{ padding: 24, background: "#f6f7fb", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Menu Management</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "8px 12px", borderRadius: 6, background: "#4f46e5", color: "#fff", border: 0, cursor: "pointer" }}>Upload</button>
          <button style={{ padding: "8px 12px", borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer" }}>Edit</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {meals.map((meal) => (
          <div key={meal.type} style={{ background: "#fff", border: "1px solid #e6e9ef", borderRadius: 8, padding: 14, boxShadow: "0 1px 2px rgba(10,10,10,0.02)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{meal.type}</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {meal.items.map((item) => (
                <li key={item} style={{ fontSize: 14, color: "#374151", marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
