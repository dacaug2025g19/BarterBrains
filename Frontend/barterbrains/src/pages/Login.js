import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";
import { loginUser } from "../api/authApi";
import { setLogin } from "../redux/slices/authslice";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch api
    //data - name,aadhar,bdate,token,role
    // if(data.role==="user")
    try {
      const res = await loginUser({ email, password });
      const data = res.data;
      const profileData = { ...data, email: email };
      dispatch(setLogin({ user: profileData }));

      console.log("Login response data:", data);
      // localStorage.setItem("profileData", JSON.stringify(profileData));
      localStorage.setItem("token", data.token);

      if (data.role === "User") {
        navigate("/user/profile");
      } else {
        navigate("/admin/dashboard");
      }
      if (data.role === "User") {
        navigate("/user/dashboard");
      }

    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
    // console.log("Logged in user:", { email, password });
  }

  return (
    <AppLayout>
      <div className="row justify-content-center section">
        <div className="col-md-5">
         <div
        className="card p-4 text-light border"
        style={{ background: "transparent" }}
         >

            <h3 className="fw-bold text-center mb-2 text-primary">
              Welcome Back
            </h3>
           <p className="text-light opacity-75 text-center mb-4">
              Login to continue
            </p>

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

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-3"
            >
              Login
            </button>


            <p className="text-center text-light opacity-75 mt-4">
             New here? <Link to="/register" className="text-info">Create account</Link>
            </p>


          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
