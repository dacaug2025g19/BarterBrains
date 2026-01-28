import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uname: "",
    email: "",
    password: "",
    phone: "",
    bdate: "",
    adhar_id: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering user with data:", form);
    try {
      await registerUser(form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <AppLayout>
      <div className="row justify-content-center section">
        <div className="col-md-5">
      <div
        className="card p-4 text-light border"
        style={{ background: "transparent" }}
         >
    <h3 className="fw-semibold text-center mb-2 text-primary">
              Create Your Account
            </h3>
            <p className="text-light opacity-75 text-center mb-4">
            Join the skill-sharing community
             </p>


            <form onSubmit={handleSubmit}>
              {[
                ["uname", "Full Name", "text"],
                ["email", "Email", "email"],
                ["password", "Password", "password"],
                ["phone", "Phone", "text"],
                ["bdate", "Birth Date", "date"],
                ["adhar_id", "Aadhar ID", "text"],
              ].map(([name, label, type]) => (
                <div className="mb-3" key={name}>
                  <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={label}
                    value={form[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Create Account
              </button>
            </form>

           <p className="text-center text-light opacity-75 mt-4">
            Already have an account?{" "}
             <Link to="/login" className="text-info fw-semibold">Login</Link>
            </p>


          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;