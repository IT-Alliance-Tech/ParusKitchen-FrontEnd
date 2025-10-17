// src/pages/AdminMealsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllMeals, deleteMeal } from "../api"; // make sure getAllMeals exists in api.js
import { useNavigate } from "react-router-dom";


const AdminMealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all meals
  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMeals();
      setMeals(data);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Failed to load meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Handle meal deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;
    try {
      await deleteMeal(id);
      setMeals(meals.filter((meal) => meal._id !== id));
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Failed to delete meal. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Meals</h1>

      {loading && <p>Loading meals...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && !error && meals.length === 0 && <p>No meals found.</p>}

      {!loading && !error && meals.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Featured</th>
                <th className="border p-3 text-left">Created At</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal._id}>
                  <td className="border p-3">{meal.name || "N/A"}</td>
                  <td className="border p-3">{meal.description || "N/A"}</td>
                  <td className="border p-3">{meal.isFeatured ? "Yes" : "No"}</td>
                  <td className="border p-3">
                    {meal.createdAt ? new Date(meal.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="border p-3 flex gap-2">
                    {/* If you want view/edit later */}
                    {/* <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => navigate(`/admin/meals/edit/${meal._id}`)}
                    >
                      View/Edit
                    </button> */}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(meal._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMealsPage;
