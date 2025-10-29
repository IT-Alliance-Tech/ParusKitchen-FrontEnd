// src/pages/AdminSettings.jsx
import React, { useState } from "react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    breakfastOnly: 1800,
    lunchDinner: 3000,
    lunchPlusDinner: 5750,
    allMeals: 6500,
    deliveryFee: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    alert("Settings saved successfully (static).");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-800">
        Admin Settings ⚙️
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Meal Plan Prices (₹)
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Breakfast Only
            </label>
            <input
              type="number"
              name="breakfastOnly"
              value={settings.breakfastOnly}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lunch/Dinner Only
            </label>
            <input
              type="number"
              name="lunchDinner"
              value={settings.lunchDinner}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lunch + Dinner
            </label>
            <input
              type="number"
              name="lunchPlusDinner"
              value={settings.lunchPlusDinner}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Breakfast + Lunch + Dinner
            </label>
            <input
              type="number"
              name="allMeals"
              value={settings.allMeals}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Delivery Fee (₹)
        </h2>

        <div className="mb-6">
          <input
            type="number"
            name="deliveryFee"
            value={settings.deliveryFee}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
