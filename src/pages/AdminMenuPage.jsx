import React, { useState } from "react";
import {
  PlusCircle,
  Edit3,
  X,
  Utensils,
  Search,
  CheckCircle,
} from "lucide-react";

export default function AdminMenuPage() {
  const [meals, setMeals] = useState([
    { type: "Breakfast", items: ["Idli", "Dosa", "Poha"] },
    { type: "Lunch", items: ["Veg Biryani", "Dal Rice", "Chapati"] },
    { type: "Dinner", items: ["Paneer Curry", "Jeera Rice", "Roti"] },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({ type: "", items: "" });
  const [toast, setToast] = useState("");

  const filteredMeals = meals
    .filter((meal) => filter === "All" || meal.type === filter)
    .filter(
      (meal) =>
        meal.type.toLowerCase().includes(search.toLowerCase()) ||
        meal.items.some((i) =>
          i.toLowerCase().includes(search.toLowerCase())
        )
    );

  const handleSave = () => {
    if (!newMeal.type || !newMeal.items) return;

    const itemsArray = newMeal.items.split(",").map((item) => item.trim());
    let updatedMeals;

    if (editMode) {
      updatedMeals = meals.map((meal) =>
        meal.type === selectedMeal.type
          ? { ...selectedMeal, items: itemsArray }
          : meal
      );
      setToast(`✅ ${selectedMeal.type} menu updated successfully!`);
    } else {
      updatedMeals = [...meals, { type: newMeal.type, items: itemsArray }];
      setToast(`🍽️ ${newMeal.type} menu added!`);
    }

    setMeals(updatedMeals);
    setNewMeal({ type: "", items: "" });
    setShowModal(false);
    setEditMode(false);
    setTimeout(() => setToast(""), 3000);
  };

  const openEditModal = (meal) => {
    setSelectedMeal(meal);
    setNewMeal({ type: meal.type, items: meal.items.join(", ") });
    setEditMode(true);
    setShowModal(true);
  };

  const openUploadModal = () => {
    setNewMeal({ type: "", items: "" });
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-inter relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
          <Utensils className="text-indigo-600" /> Menu Management
        </h2>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={openUploadModal}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            <PlusCircle size={18} /> Add Menu
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2 bg-white border border-gray-200 rounded-full shadow-sm px-4 py-2 w-full sm:w-80">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by meal or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm text-gray-700"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Breakfast", "Lunch", "Dinner"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No meals found. Try adjusting your filter or search.
          </div>
        ) : (
          filteredMeals.map((meal) => (
            <div
              key={meal.type}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {meal.type} Menu
                </h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {meal.items.length} items
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {meal.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 text-sm bg-gray-50 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                  >
                    <span className="mr-2 text-indigo-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => openEditModal(meal)}
              >
                <Edit3 size={15} /> Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-fade-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editMode ? `Edit ${newMeal.type} Menu` : "Add New Menu"}
            </h3>

            {!editMode && (
              <input
                type="text"
                placeholder="Meal Type (e.g., Snacks)"
                value={newMeal.type}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <textarea
              placeholder="Items (comma separated)"
              value={newMeal.items}
              onChange={(e) =>
                setNewMeal({ ...newMeal, items: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-28 focus:ring-2 focus:ring-indigo-500"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1"
                onClick={handleSave}
              >
                <CheckCircle size={15} /> {editMode ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
