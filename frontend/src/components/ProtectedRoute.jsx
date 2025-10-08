import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // redirect to login if no token
    return <Navigate to="/login" replace />;
  }

  // render children if token exists
  return children;
}

