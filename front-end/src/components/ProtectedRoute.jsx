import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  if (!isAuthenticated) {
    return <Navigate to="/autuh/signin" replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
