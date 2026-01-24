import React from "react";
import { NavLink } from "react-router-dom";
import "../css/UserSidebar.css";

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h3 className="sidebar-title">User Panel</h3>

      <nav className="sidebar-nav">
        <NavLink to="/user/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/user/skill-search" className="sidebar-link">
          Skill Search
        </NavLink>

        <NavLink to="/user/chat" className="sidebar-link">
          Chat
        </NavLink>

        <NavLink to="/user/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default UserSidebar;
