import React, { useEffect, useState } from "react";
import { getMyOrders } from "../api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  if (loading) return <p className="text-center mt-12">Loading orders...</p>;

  return (
    <main className="flex-grow bg-beige-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">You have not placed any orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2"
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items?.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
