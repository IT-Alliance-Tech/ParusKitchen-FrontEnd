// src/pages/AdminEditUserPage.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api"; // Replace with getUserById if available
import { useParams, useNavigate } from "react-router-dom";

const AdminEditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const allUsers = await getAllUsers(); // If backend has getUserById, replace this
        const selectedUser = allUsers.find((u) => u._id === id);
        setUser(selectedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        navigate("/admin/users");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View/Edit User</h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      {/* Optional: Add edit form here if backend supports update */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete User
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        onClick={() => navigate("/admin/users")}
      >
        Back to Users
      </button>
    </div>
  );
};

export default AdminEditUserPage;
