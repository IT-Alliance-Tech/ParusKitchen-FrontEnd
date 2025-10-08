import React, { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart, createOrder } from "../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
    setLoading(false);
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(id, { quantity });
      fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    setPlacingOrder(true);
    try {
      await createOrder({ items: cartItems });
      alert("Order placed successfully!");
      fetchCart(); // clear cart after order
    } catch (error) {
      console.error("Failed to place order:", error);
    }
    setPlacingOrder(false);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-12">Loading cart...</p>;

  return (
    <main className="flex-grow bg-beige-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-6">My Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-semibold mb-4">
                Total: ${totalAmount.toFixed(2)}
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-poppins font-semibold"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
