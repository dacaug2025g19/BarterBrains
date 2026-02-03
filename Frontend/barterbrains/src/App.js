import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

/* PUBLIC */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* USER */
import UserProfile from "./pages/UserProfile";
import SkillSearch from "./pages/SkillSearch";
import UserDashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import Session from "./pages/session";              // ✅ EXISTING
import CreateSession from "./pages/CreateSession";  // ✅ ADDED

/* ADMIN PAGES */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminReports from "./pages/admin/AdminReports";

/* ROUTE GUARD */








import Confirmation from "./pages/ConfirmPage"; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== USER ===== */}
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/skill-search" element={<SkillSearch />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/session" element={<Session />} />              {/* ✅ EXISTING */}
        <Route path="/user/session/create" element={<CreateSession />} /> {/* ✅ ADDED */}
        <Route path="/user/confirm" element={<Confirmation />} /> 
        
        
        <Route path="/profile/:uid" element={<Profile />} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/skills" element={<AdminSkills />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
