import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppLayout>
      <div className="row justify-content-center section">
        <div className="col-md-5">
          <div className="card p-5">

            <h3 className="fw-bold text-center mb-2">
              Welcome Back
            </h3>
            <p className="text-muted text-center mb-4">
              Login to continue
            </p>

            <form>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <p className="text-center text-muted mt-4">
              New here? <Link to="/register">Create account</Link>
            </p>

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
