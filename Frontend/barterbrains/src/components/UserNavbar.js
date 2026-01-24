import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

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
    </nav>
  );
};

export default UserNavbar;
