// src/pages/AdminMealsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllMeals, deleteMeal, createMeal, updateMeal } from "../api";
import { useNavigate } from "react-router-dom";

const AdminMealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", isFeatured: false });
  const [editingMealId, setEditingMealId] = useState(null);

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

  // Handle Pause/Unpause meal
  const handleToggleActive = async (meal) => {
    try {
      await updateMeal(meal._id, { isActive: !meal.isActive });
      setMeals(meals.map(m => m._id === meal._id ? { ...m, isActive: !m.isActive } : m));
    } catch (err) {
      console.error("Error updating meal status:", err);
      alert("Failed to update meal status.");
    }
  };

  // Handle Add/Edit Meal form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMealId) {
        // Edit existing meal
        const updated = await updateMeal(editingMealId, formData);
        setMeals(meals.map(m => m._id === editingMealId ? updated : m));
      } else {
        // Create new meal
        const newMeal = await createMeal(formData);
        setMeals([...meals, newMeal]);
      }
      setShowForm(false);
      setEditingMealId(null);
      setFormData({ name: "", description: "", price: "", isFeatured: false });
    } catch (err) {
      console.error("Error saving meal:", err);
      alert("Failed to save meal. Please try again.");
    }
  };

  // Start editing a meal
  const handleEdit = (meal) => {
    setEditingMealId(meal._id);
    setFormData({ 
      name: meal.name || "", 
      description: meal.description || "", 
      price: meal.price || "", 
      isFeatured: meal.isFeatured || false 
    });
    setShowForm(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Meals</h1>

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => { setShowForm(true); setEditingMealId(null); setFormData({ name: "", description: "", price: "", isFeatured: false }); }}
      >
        Add New Meal
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-6 bg-gray-100 p-4 rounded shadow space-y-3"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Meal Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editingMealId ? "Update Meal" : "Add Meal"}
            </button>
            <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

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
                <th className="border p-3 text-left">Active</th>
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
                  <td className="border p-3">{meal.isActive ? "Yes" : "No"}</td>
                  <td className="border p-3">{meal.createdAt ? new Date(meal.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td className="border p-3 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(meal)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                      onClick={() => handleToggleActive(meal)}
                    >
                      {meal.isActive ? "Pause" : "Resume"}
                    </button>
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
