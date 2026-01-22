import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";

const Register = () => {
  const [form, setForm] = useState({
    uname: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <AppLayout>
      <div className="row justify-content-center section">
        <div className="col-md-6">
          <div className="card p-5">

            <h3 className="fw-bold text-center mb-2">
              Create Your Account
            </h3>
            <p className="text-muted text-center mb-4">
              Join the skill-sharing community
            </p>

            {[
              ["uname", "Full Name"],
              ["email", "Email"],
              ["password", "Password"],
              ["phone", "Phone"],
            ].map(([name, label]) => (
              <div className="mb-3" key={name}>
                <input
                  type={name === "password" ? "password" : "text"}
                  name={name}
                  className="form-control"
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <button className="btn btn-primary w-100 mt-3">
              Create Account
            </button>

            <p className="text-center text-muted mt-4">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
