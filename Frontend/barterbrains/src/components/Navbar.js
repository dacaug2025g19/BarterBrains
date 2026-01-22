import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        BarterBrain
      </Link>

      {/* Buttons */}
      <div className="ms-auto">
        <Link to="/login" className="btn btn-outline-info me-2">
          Login
        </Link>

        <Link to="/register" className="btn btn-info text-dark">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
