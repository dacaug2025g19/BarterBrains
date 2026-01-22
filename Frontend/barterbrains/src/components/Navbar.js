import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        <span style={{ color: "#8b5cf6" }}>Barter</span>
        <span style={{ color: "#22d3ee" }}>Brains</span>
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-primary me-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-primary" to="/register">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
