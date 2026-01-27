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
            <h1>
              🚀 Level Up Your Skills.<br />
              🌟 Share Knowledge.<br />
              💡 Make an Impact.
            </h1>

            {/* Description */}
            <p>
              Step into BarterBrains and explore a world of learning. Discover new skills, 
              share your expertise, earn rewards, and connect with a community of learners—all 
              in one place.
            </p>

            {/* CTA */}
            <button className="dashboard-btn">
              Start Your Adventure →
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