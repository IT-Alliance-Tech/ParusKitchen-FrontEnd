import React from "react";

const OrderHistoryPage = () => {
  const orders = [
    {
      id: "ORD001",
      date: "2025-10-20",
      items: ["Paneer Butter Masala", "Jeera Rice"],
      total: 320,
      status: "Delivered",
    },
    {
      id: "ORD002",
      date: "2025-10-25",
      items: ["Veg Biryani", "Raita"],
      total: 280,
      status: "Out for Delivery",
    },
    {
      id: "ORD003",
      date: "2025-10-28",
      items: ["Roti", "Dal Tadka"],
      total: 200,
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary-800 text-center mb-8">
        My Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-primary-700">
                  Order ID: {order.id}
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Out for Delivery"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {order.date}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Items:</strong> {order.items.join(", ")}
              </p>
              <p className="text-gray-800 font-semibold">
                <strong>Total:</strong> ₹{order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
