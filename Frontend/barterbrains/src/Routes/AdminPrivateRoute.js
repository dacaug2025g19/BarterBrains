// src/routes/AdminPrivateRoute.jsx
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const adminToken = localStorage.getItem("admin_token");
  return adminToken ? children : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
