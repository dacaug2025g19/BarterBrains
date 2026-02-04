//Dashboard.js import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import "../css/dashboard.css";

// image import
import dashboardImage from "../images/image.png";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <UserNavbar />

      <div className="d-flex user-layout">
        <UserSidebar />

        <div className="dashboard-content">
          
          {/* LEFT CONTENT */}
          <div className="dashboard-text">
            <h1 className="dashboard-main-title">
              Welcome to Your <br />
              <span className="dashboard-main-title-accent">Learning Hub</span>
            </h1>

            <p className="dashboard-main-desc">
              Track your progress, share skills, earn points, and connect with a
              vibrant community of learners and teachers—all in one personalized
              dashboard.
            </p>

            <button
              className="dashboard-btn"
              onClick={() => navigate("/user/profile")}
            >
              View Profile →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="dashboard-image">
            <img src={dashboardImage} alt="Skills Illustration" />
          </div>

        </div>
      </div>
    </>
  );
};

export default UserDashboard;