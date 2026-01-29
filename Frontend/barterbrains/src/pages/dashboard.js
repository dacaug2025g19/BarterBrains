import React from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import "../css/dashboard.css";

const UserDashboard = () => {
  return (
    <>
      <UserNavbar />

      <div className="d-flex user-layout">
        <UserSidebar />

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          <div className="dashboard-text">
            {/* Slogan */}
            <h1 className="dashboard-main-title">
              Welcome to Your <br />
              <span className="dashboard-main-title-accent">Learning Hub</span>
            </h1>

            {/* Description */}
            <p className="dashboard-main-desc">
              Track your progress, share skills, earn points, and connect with a vibrant community of learners and teachers—all in one personalized dashboard.
            </p>

            {/* CTA */}
            <button className="dashboard-btn">
              Explore Features →
            </button>
          </div>

          {/* Illustration */}
          <div className="dashboard-image">
            <img
              src="/dashboard-illustration-5.png"
              alt="Dashboard Illustration"
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default UserDashboard;