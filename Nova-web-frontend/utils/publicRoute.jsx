import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children}) => {

  const authToken = useSelector((state) => state.authToken.token);

  if (authToken) {
    return <Navigate to="/dashboard" replace />
  }

   return children;
}


export default PublicRoute;