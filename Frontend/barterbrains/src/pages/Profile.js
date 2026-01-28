import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getClickedProfile } from "../api/authApi";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import { SendRequest } from "../api/authApi";
import "../css/Profile.css";



const Profile = () => {
      const {uid} = useParams();

      const [profile, setProfile] = useState(null);

useEffect(() => {
  fetchProfile();
},[uid]);

const fetchProfile = async ()=>{
  try{
    const res = await getClickedProfile(uid);
    setProfile(res.data);
    console.log("Fetched profile:", res.data);
    console.log(uid);

  }catch(error){
    console.error("Error fetching profile:", error);
  }
}

return (
  <>
    <UserNavbar />
    <div className="d-flex user-layout">
      <UserSidebar />

      <div className="clickedprofile-container">
        {!profile ? (
          <p>Loading profile...</p>
        ) : (
          <div className="clickedprofile-card">

            {/* Top Section */}
            <div className="clickedprofile-header">
              <div className="avatar">
                {profile.uname.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{profile.uname}</h2>
                <p className="muted">{profile.email}</p>
                <p className="muted">{profile.phone}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="clickedprofile-section">
              <h4>Bio</h4>
              <p>{profile.bio || "No bio provided"}</p>
            </div>

            {/* Skills */}
            <div className="clickedprofile-section">
              <h4>Can Teach</h4>
              <p>
                {profile.teachSkills?.length > 0
                  ? profile.teachSkills.join(", ")
                  : "N/A"}
              </p>
            </div>

            <div className="clickedprofile-section">
              <h4>Wants To Learn</h4>
              <p>
                {profile.learnSkills?.length > 0
                  ? profile.learnSkills.join(", ")
                  : "N/A"}
              </p>
            </div>

            {/* Button */}
            <div className="btn-area">
              <button className="send-btn" onClick={SendRequest}>
                Send Request
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  </>
);

}

export default Profile;