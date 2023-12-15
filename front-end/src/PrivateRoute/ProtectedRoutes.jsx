import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
