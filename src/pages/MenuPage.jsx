import React, { useState, useEffect } from "react";
import { Download, Clock, Users, Leaf, Filter } from "lucide-react";
import axios from "axios";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "Vegetarian", name: "Vegetarian" },
    { id: "Millet Special", name: "Millet Special" },
    { id: "Diabetic Friendly", name: "Diabetic Friendly" },
  ];

  const weeklyMenu = [
    { day: "Monday", lunch: "Sambar Rice + Vegetable Curry", dinner: "Chapati + Dal + Sabzi" },
    { day: "Tuesday", lunch: "Curd Rice + Pickle + Papad", dinner: "Millet Khichdi + Raita" },
    { day: "Wednesday", lunch: "Vegetable Biryani + Raita", dinner: "Roti + Paneer Curry + Rice" },
    { day: "Thursday", lunch: "Lemon Rice + Sambar", dinner: "Chapati + Palak Dal + Vegetable" },
    { day: "Friday", lunch: "Tamarind Rice + Vegetable", dinner: "Ragi Roti + Curry + Rice" },
    { day: "Saturday", lunch: "Pulao + Raita + Pickle", dinner: "Chapati + Mixed Dal + Sabzi" },
    { day: "Sunday", lunch: "Special Thali", dinner: "Dosa + Sambar + Chutney" },
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/meals");
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter(
          (item) => item.category?.name?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-primary-800 mb-6">
            Our Weekly Menu
          </h1>
          <p className="font-lato text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Fresh, varied, and nutritious meals prepared daily with love. Our rotating menu ensures
            you enjoy different flavors throughout the week.
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-poppins font-semibold transition-colors duration-200 inline-flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Download Menu PDF
          </button>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              This Week's Schedule
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Plan your week with our rotating menu featuring different cuisines and specialties
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {weeklyMenu.map((day, index) => (
              <div
                key={index}
                className="bg-primary-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-poppins font-bold text-xl text-primary-800 mb-4">{day.day}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-medium mr-3">
                      Lunch
                    </div>
                    <span className="font-lato text-gray-700">{day.lunch}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-poppins font-medium mr-3">
                      Dinner
                    </div>
                    <span className="font-lato text-gray-700">{day.dinner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Menu Categories
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Browse our carefully curated selection of healthy, delicious meals
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-poppins font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-primary-600 hover:bg-primary-100 border border-primary-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {loading ? (
            <p className="text-center text-gray-600">Loading meals...</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-600">No meals found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="font-poppins font-bold text-primary-600">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-bold text-xl text-primary-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="font-lato text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>45 min</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Serves 1–2</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-poppins font-medium">
                        {item.category?.name || "General"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                Fresh Ingredients
              </h3>
              <p className="font-lato text-gray-600">
                We source fresh, local ingredients daily to ensure the highest quality in every meal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                Dietary Options
              </h3>
              <p className="font-lato text-gray-600">
                Choose from vegetarian, vegan, diabetic-friendly, and other specialized meal options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                Rotating Menu
              </h3>
              <p className="font-lato text-gray-600">
                Our weekly rotating menu ensures variety and seasonal ingredients in your meals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
