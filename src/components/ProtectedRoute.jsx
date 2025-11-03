// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || (user.role !== "admin" && user.role !== "superadmin")) {
    return <Navigate to="/admin/login" replace />;
  }

  return <div className="relative">{children}</div>;
};

export default ProtectedRoute;
