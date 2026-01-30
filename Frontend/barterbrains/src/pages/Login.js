import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";
import { loginCommon } from "../api/authApi";
import { setLogin } from "../redux/slices/authslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 COMMON LOGIN (USER + ADMIN)
      const res = await loginCommon({ email, password });
      const data = res.data;
// <<<<<<< HEAD

//       // Store profile data in redux
//       dispatch(setLogin({ user: { email, role: data.role } }));

//       // Redirect based on role
//       if (data.role === "Admin") {
//         localStorage.setItem("admin_token", data.token);
//         navigate("/admin/dashboard");
//       } else {
//         localStorage.setItem("token", data.token);
//         navigate("/user/dashboard");

      // data = { ...data, email: email };
      dispatch(setLogin(data));   

    console.log("Login response data:", data);
      // localStorage.setItem("profileData", JSON.stringify(profileData));
      localStorage.setItem("token", data.token);

      if (data.role === "User") {
        navigate("/user/profile");
      } else if(data.role === "Admin") {
        navigate("/admin/dashboard");

      }

    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <AppLayout>
      <div className="row justify-content-center section">
        <div className="col-md-5">
          <div className="card p-5">

            <h3 className="fw-bold text-center mb-2 text-primary">
              Welcome Back
            </h3>
            <p className="text-muted text-center mb-4">
              Login to continue
            </p>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-3"
            >
              Login
            </button>

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
