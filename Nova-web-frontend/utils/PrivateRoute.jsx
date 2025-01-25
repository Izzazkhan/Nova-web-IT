import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole}) => {

  const userRole = useSelector((state) => state.authToken.role)
  const authToken = useSelector((state) => state.authToken.token);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
  }

  return children;

  // return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;