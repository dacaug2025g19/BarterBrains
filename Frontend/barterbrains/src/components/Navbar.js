import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand fw-bold" href="/">
        BarterBrain
      </a>

      <div className="ms-auto">
        <button className="btn btn-outline-info me-2">
          Login
        </button>
        <button className="btn btn-info text-dark">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
