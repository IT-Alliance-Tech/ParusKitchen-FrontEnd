import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get token and role from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If no token or not admin → redirect to admin login
  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // If admin → allow access
  return children;
};

export default ProtectedRoute;