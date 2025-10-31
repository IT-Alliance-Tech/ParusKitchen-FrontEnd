import React, { useState } from "react";

export default function AdminMenuPage() {
  const [meals, setMeals] = useState([
    { type: "Breakfast", items: ["Idli", "Dosa", "Poha"] },
    { type: "Lunch", items: ["Veg Biryani", "Dal Rice", "Chapati"] },
    { type: "Dinner", items: ["Paneer Curry", "Jeera Rice", "Roti"] },
  ]);

  const [filter, setFilter] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({ type: "", items: "" });

  const filteredMeals =
    filter === "All" ? meals : meals.filter((meal) => meal.type === filter);

  const handleUpload = () => {
    if (newMeal.type && newMeal.items) {
      const itemsArray = newMeal.items.split(",").map((item) => item.trim());
      setMeals([...meals, { type: newMeal.type, items: itemsArray }]);
      setNewMeal({ type: "", items: "" });
      setShowUploadModal(false);
    }
  };

  const handleEdit = () => {
    setMeals(
      meals.map((meal) =>
        meal.type === selectedMeal.type ? selectedMeal : meal
      )
    );
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-inter">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          🍽️ Menu Management
        </h2>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
            onClick={() => setShowUploadModal(true)}
          >
            Upload Menu
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={() => setFilter("All")}
          >
            Show All
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Breakfast", "Lunch", "Dinner"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === type
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.map((meal) => (
          <div
            key={meal.type}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {meal.type}
              </h3>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {meal.items.length} items
              </span>
            </div>

            <ul className="space-y-2">
              {meal.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center text-gray-700 text-sm bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                >
                  <span className="mr-2 text-indigo-500">•</span> {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 text-right">
              <button
                className="text-sm text-indigo-600 hover:underline"
                onClick={() => {
                  setSelectedMeal(meal);
                  setShowEditModal(true);
                }}
              >
                Edit {meal.type}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 mt-10">
        Tip: Use this page to manage or preview today’s menu.
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Upload New Menu
            </h3>
            <input
              type="text"
              placeholder="Meal Type (e.g., Snacks)"
              value={newMeal.type}
              onChange={(e) =>
                setNewMeal({ ...newMeal, type: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Items (comma separated)"
              value={newMeal.items}
              onChange={(e) =>
                setNewMeal({ ...newMeal, items: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={handleUpload}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Edit {selectedMeal.type} Menu
            </h3>
            <textarea
              value={selectedMeal.items.join(", ")}
              onChange={(e) =>
                setSelectedMeal({
                  ...selectedMeal,
                  items: e.target.value.split(",").map((i) => i.trim()),
                })
              }
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={handleEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
