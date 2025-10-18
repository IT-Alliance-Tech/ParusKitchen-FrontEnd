// src/pages/AdminOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { getAdminOrders } from "../api";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}

      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Order ID</th>
                <th className="border p-3">User</th>
                <th className="border p-3">Items</th>
                <th className="border p-3">Total Amount</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Delivery Address</th>
                <th className="border p-3">Payment Method</th>
                <th className="border p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-3">{order._id}</td>
                  <td className="border p-3">{order.user?.name || "N/A"}</td>
                  <td className="border p-3">
                    {Array.isArray(order.items)
                      ? order.items
                          .map(
                            (item) =>
                              `${item.meal} × ${item.quantity} (₹${item.price})`
                          )
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td className="border p-3">₹{order.totalAmount ?? 0}</td>
                  <td className="border p-3">{order.status || "Pending"}</td>
                  <td className="border p-3">
                    {order.deliveryAddress || "N/A"}
                  </td>
                  <td className="border p-3">{order.paymentMethod || "N/A"}</td>
                  <td className="border p-3">{order.paymentStatus || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
