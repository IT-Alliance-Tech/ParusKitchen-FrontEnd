import React from "react";

const OrdersPage = () => {
  // TODO: Connect API to fetch user orders
  const orders = [
    {
      id: 1,
      date: "2025-10-07",
      total: 450,
      status: "Delivered",
    },
    {
      id: 2,
      date: "2025-10-05",
      total: 280,
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-primary-50 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-poppins font-bold text-primary-800 mb-6">
          Your Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 font-lato">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 border rounded-xl"
              >
                <div>
                  <p className="font-lato text-gray-600">Order Date: {order.date}</p>
                  <p className="font-poppins font-semibold text-primary-800">
                    Total: ₹{order.total}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full font-lato text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
