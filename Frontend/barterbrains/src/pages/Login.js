import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <AppLayout>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card bg-black text-light border-secondary shadow-lg">
            <div className="card-body p-4">

              <h3 className="text-center text-info fw-bold mb-4">
                Login to BarterBrains
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-end mb-3">
                  <Link to="/forgot-password" className="text-info">
                    Forgot Password?
                  </Link>
                </div>

                <div className="d-grid">
                  <button className="btn btn-info btn-lg text-dark">
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <p className="text-secondary">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-info">
                    Register
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
