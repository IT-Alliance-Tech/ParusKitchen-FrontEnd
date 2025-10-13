// src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import { getMeals, addToCart } from "../api";

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState("lunch");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch meals from backend
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals();
        setMeals(data);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to fetch meals");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  // Temporary meal split for lunch/dinner
  const lunchMeals = meals.slice(0, Math.ceil(meals.length / 2));
  const dinnerMeals = meals.slice(Math.ceil(meals.length / 2));

  const handleAddToCart = async (meal) => {
    try {
      await addToCart({ mealId: meal._id, quantity: 1 });
      alert(`${meal.name} added to cart!`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <div className="p-8">Loading meals...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const displayedMeals = selectedMealType === "lunch" ? lunchMeals : dinnerMeals;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>

      {/* Meal Type Selector */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-xl font-semibold ${
            selectedMealType === "lunch" ? "bg-primary-600 text-white" : "bg-white border"
          }`}
          onClick={() => setSelectedMealType("lunch")}
        >
          Lunch
        </button>
        <button
          className={`px-6 py-2 rounded-xl font-semibold ${
            selectedMealType === "dinner" ? "bg-primary-600 text-white" : "bg-white border"
          }`}
          onClick={() => setSelectedMealType("dinner")}
        >
          Dinner
        </button>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMeals.map((meal) => (
          <div key={meal._id} className="bg-white p-4 rounded-xl shadow-md">
            <img
              src={meal.imageURL}
              alt={meal.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{meal.name}</h2>
            <p className="text-gray-600 mb-2">{meal.description}</p>
            <p className="text-primary-600 font-semibold mb-4">₹{meal.price}</p>
            <button
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-xl font-bold"
              onClick={() => handleAddToCart(meal)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
