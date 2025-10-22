// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCart } from "../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const cart = await getCart();
        setCartItems(cart || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  if (cartItems.length === 0) return <p className="text-center mt-10">Your cart is empty</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-700">Type: {item.itemType}</p>
              <p className="font-medium">Price: ${item.price}</p>
              <p className="font-medium">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
