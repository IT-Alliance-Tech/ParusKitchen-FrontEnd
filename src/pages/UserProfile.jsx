import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getUserProfile, updateUserProfile } from "../api";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchUserProfile();
  }, []);
  // raghu//

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setUserData({ name: data.name, email: data.email, password: "" });
    } catch (error) {
      console.error("Failed to load profile:", error);
      setMessage("Failed to load profile. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const updatedData = await updateUserProfile(userData);
      setUserData({ ...updatedData, password: "" });
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update profile. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-12">Loading profile...</p>;

  return (
    <main className="flex-grow bg-beige-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-6">My Profile</h1>

        {message && (
          <p className="text-center mb-4 text-green-600 font-semibold">{message}</p>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => navigate("/user-payments")} // ✅ redirects to your UserPaymentHistory page
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"
          >
            My Payments
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            Go to Dashboard
          </button>
        </div>

        {!editing ? (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
              required
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
              required
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
