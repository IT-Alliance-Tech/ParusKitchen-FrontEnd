// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCart } from "../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch cart data (from API or static fallback)
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await getCart();

        // ✅ Adjust if backend returns { items: [...] }
        const items = res?.items || res || [];

        if (items.length > 0) {
          // Normalize data to match UI expectations
          const formattedItems = items.map((item) => {
            if (item.meal) {
              return {
                _id: item.meal._id,
                name: item.meal.name,
                itemType: "Meal Item",
                price: item.meal.price || 0,
                quantity: item.quantity || 1,
              };
            } else if (item.subscription) {
              return {
                _id: item.subscription._id,
                name: item.subscription.name,
                itemType: "Subscription Plan",
                price: item.subscription.price || 0,
                quantity: item.quantity || 1,
              };
            } else {
              return {
                _id: item._id,
                name: item.name || "Unknown Item",
                itemType: "Misc Item",
                price: item.price || 0,
                quantity: item.quantity || 1,
              };
            }
          });

          setCartItems(formattedItems);
        } else {
          // Static fallback
          setCartItems([
            {
              _id: "1",
              name: "Lunch + Dinner Plan",
              itemType: "Monthly Subscription",
              price: 5750,
              quantity: 1,
            },
            {
              _id: "2",
              name: "Breakfast Only Plan",
              itemType: "Monthly Subscription",
              price: 1800,
              quantity: 1,
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        // Use static data if API fails
        setCartItems([
          {
            _id: "1",
            name: "Lunch + Dinner Plan",
            itemType: "Monthly Subscription",
            price: 5750,
            quantity: 1,
          },
          {
            _id: "2",
            name: "Breakfast Only Plan",
            itemType: "Monthly Subscription",
            price: 1800,
            quantity: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Details Submitted:", formData);
    alert("Delivery details submitted successfully!");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      {/* Cart Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-primary-800 text-center">My Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 shadow-md flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800">{item.name}</h3>
                    <p className="text-gray-700">{item.itemType}</p>
                    <p className="font-medium text-gray-800">Price: ₹{item.price}</p>
                    <p className="font-medium text-gray-800">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-lg">
                <p className="flex justify-between">
                  <span>Subtotal:</span> <span>₹{subtotal}</span>
                </p>
                <p className="flex justify-between">
                  <span>Delivery Fee:</span> <span>₹{deliveryFee}</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between font-bold text-xl text-primary-700">
                  <span>Total:</span> <span>₹{total}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Delivery Details Form push */}
      <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-primary-800 mb-6 text-center">
          Delivery Details
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200"
            >
              Submit Delivery Details
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CartPage;
