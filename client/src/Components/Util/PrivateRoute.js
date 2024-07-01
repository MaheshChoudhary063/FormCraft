import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../../Routes/authRoute";

const PrivateRoute = ({ element: Component }) => {
  return auth.isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
