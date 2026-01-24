import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/slices/authslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";     
import UserNavbar from "../components/UserNavbar";     

const UserProfile = () => {
 
     const dispatch = useDispatch();
  
    const navigate = useNavigate();
  
 const user = useSelector((state)=>state.auth.user);

 const handleLogout = () => {
  localStorage.removeItem("token");   
  dispatch(logout());               //clear user data from redux store 
  navigate("/login");
 
};
 

   if (!user) return <p className="text-white">Loading...</p>;

  return (
    <>
      <UserNavbar />

      <div className="d-flex user-layout">

        <UserSidebar />

        <div className="container mt-5 text-black">
          <h2>Welcome, {user.uname}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Aadhar:</strong> {user.adhar_id}</p>
          <p><strong>Birth Date:</strong> {user.bdate}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </>
  );

};

export default UserProfile;
