// src/pages/SubscriptionPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptions, getAddOns, addToCart } from "../api";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch subscriptions and add-ons
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const subsData = await getSubscriptions();
        const addOnsData = await getAddOns();
        setSubscriptions(subsData || []);
        setAddOns(addOnsData || []);
      } catch (err) {
        console.error("Error fetching subscriptions or add-ons:", err);
        setError("Failed to load subscriptions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (subscriptionId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirect: "/subscriptions" } });
      return;
    }

    try {
      await addToCart({ itemType: "subscription", itemId: subscriptionId, quantity: 1 });
      alert("Subscription added to cart successfully!");
      navigate("/cart"); // Redirect to cart after adding
    } catch (err) {
      console.error("Error adding subscription to cart:", err);
      if (err.message.includes("Unauthorized")) {
        navigate("/login", { state: { redirect: "/subscriptions" } });
      } else {
        alert("Failed to add subscription to cart. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-160px)]">
        <p className="text-gray-700 text-lg">Loading subscriptions...</p>
      </main>
    );
  }

  return (
    <main className="flex-grow px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Subscription Plans</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Subscription Plans */}
      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subscriptions.map((plan) => (
            <div
              key={plan._id}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-primary-700 mb-2">{plan.name}</h2>
              <p className="text-gray-700 mb-2">{plan.description}</p>
              <p className="font-medium text-gray-900 mb-1">Price: ${plan.price}</p>
              <p className="text-gray-600 mb-3">Duration: {plan.duration}</p>
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                onClick={() => handleAddToCart(plan._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mb-12">No subscriptions available.</p>
      )}

      <h1 className="text-3xl font-bold text-primary-800 mb-6">Add-Ons</h1>

      {/* Add-Ons */}
      {addOns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon) => (
            <div
              key={addon._id}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-primary-700 mb-2">{addon.name}</h2>
              <p className="text-gray-700 mb-2">{addon.description}</p>
              <p className="font-medium text-gray-900">Price: ${addon.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No add-ons available.</p>
      )}
    </main>
  );
};

export default SubscriptionPage;
