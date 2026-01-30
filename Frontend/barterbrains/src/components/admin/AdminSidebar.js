import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/adminLayout.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <h2 className="logo">BarterBrains</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/skills">Skills</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
