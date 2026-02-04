import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClickedProfile } from "../api/authApi";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import { useSelector } from "react-redux";
import { SendRequestapi, SendRequest } from "../api/authApi";
import "../css/Profile.css";



const Profile = () => {
  const { uid } = useParams();

  const [profile, setProfile] = useState(null);

  const [requestSent, setRequestSent] = useState(false);

  const redux_uid = useSelector((state) => state.auth.user?.uid);

  useEffect(() => {
    fetchProfile();
  }, [uid]);

  useEffect(() => {
    if (profile && redux_uid) {
      checkRequest();
    }
  }, [profile])

  const checkRequest = async () => {
    try {
      const res = await SendRequest(redux_uid, profile.uid);
      if (res.data === true) {
        setRequestSent(true);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await getClickedProfile(uid);
      setProfile(res.data);
      console.log("Fetched profile:", res.data);
      console.log(uid);

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const sendRequest = async () => {
    try {
      const requestData = {
        sender_id: redux_uid,
        receiver_id: profile.uid,
      };
      console.log("Sending request with data:", requestData);
      await SendRequestapi(requestData);

      setRequestSent(true);
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }
  if (profile) {
    return (
      <>
        <UserNavbar />
        <div className="d-flex user-layout">
          <UserSidebar />

          <div className="clickedprofile-container">
            <div className="clickedprofile-card">
              {/* Header */}
              <div className="cp-header">
                <div className="cp-avatar">
                  {profile.uname.charAt(0).toUpperCase()}
                </div>

                <div className="cp-userinfo">
                  <h2>{profile.uname}</h2>
                  <p>{profile.email}</p>
                  <p>{profile.phone}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="cp-section">
                <h4>About</h4>
                <p>{profile.bio || "No bio provided"}</p>
              </div>

              {/* Skills */}
              <div className="cp-section">
                <h4>Can Teach</h4>
                <div className="skill-badges">
                  {profile.teachSkills?.length > 0
                    ? profile.teachSkills.map((s, i) => (
                      <span key={i} className="skill-badge teach">{s}</span>
                    ))
                    : <span className="muted">N/A</span>}
                </div>
              </div>

              <div className="cp-section">
                <h4>Wants To Learn</h4>
                <div className="skill-badges">
                  {profile.learnSkills?.length > 0
                    ? profile.learnSkills.map((s, i) => (
                      <span key={i} className="skill-badge learn">{s}</span>
                    ))
                    : <span className="muted">N/A</span>}
                </div>
              </div>

              {/* Extra Info */}
              <div className="cp-info-grid">
                <div>
                  <h5>Experience Level</h5>
                  <p>{profile.exp_level}</p>
                </div>

                <div>
                  <h5>Certification</h5>
                  <a href={`http://localhost:8081${profile.cert_url}`} target="_blank" rel="noreferrer">
                    View Certificate
                  </a>
                </div>

              </div>
              {/* Feedback Section */}
              <div className="cp-section">
                <h4>Feedback from Learners</h4>

                {profile.feedbacks?.length > 0 ? (
                  <div className="feedback-list">
                    {profile.feedbacks.map((f, i) => (
                      <div key={i} className="feedback-card">
                        <p className="feedback-text">“{f.feedback}”</p>
                        <p className="feedback-user">— {f.learnerName}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="muted">No feedback yet</p>
                )}
              </div>


              {/* Button */}
              <button
                className="send-btn"
                onClick={sendRequest}
                disabled={requestSent}
              >
                {requestSent ? "Request Sent" : "Send Request"}
              </button>
             

            </div>
          </div>

        </div>
      </>
    );
  } return <div>Loading profile...</div>;
}

export default Profile;