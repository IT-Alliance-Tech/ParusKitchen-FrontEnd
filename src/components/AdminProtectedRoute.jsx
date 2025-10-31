import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const adminRole = localStorage.getItem("adminRole");

  if (!adminToken || adminRole !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
