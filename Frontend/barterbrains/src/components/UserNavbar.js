import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  return (
    <nav
      style={{
        height: "60px",
        backgroundColor: "#0a0a0a",
        borderBottom: "1px solid #1f1f1f",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <h4
        style={{
          color: "#22d3ee",
          fontWeight: "700",
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        BarterBrains
      </h4>
      {/* Right side - Username */}
      <h4
        style={{
          marginLeft: "auto",
          color: "#0a0a0a",
          backgroundColor: "#22d3ee",
          padding: "6px 14px",
          borderRadius: "20px",
          fontWeight: "800",
          fontSize: "14px",
        }}
      >
        {user?.uname}
      </h4>

    </nav>
  );
};

export default UserNavbar;
