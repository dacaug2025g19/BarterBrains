import React, { useEffect, useState } from "react";
import "../css/Session.css";
import { getAcceptedRequests } from "../api/sessionApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAcceptedChatRequests } from "../api/authApi";

import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const Session = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.user);

  const storedUser = localStorage.getItem("user");
  const teacherId = storedUser
    ? JSON.parse(storedUser).uid
    : Number(localStorage.getItem("uid"));

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senders, setSenders] = useState([]);
  useEffect(() => {
    if (loggedUser?.uid) {
      getAcceptedChatRequests(loggedUser.uid)
        .then((res) => setSenders(res.data))
        .catch((err) => console.error(err));
    }
  }, [loggedUser]);



  useEffect(() => {
    console.log("Session page loaded");
    console.log("Teacher ID:", teacherId);

    if (!teacherId) {
      console.error("Teacher ID not found in localStorage");
      setLoading(false);
      return;
    }

    getAcceptedRequests(teacherId)
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        setRequests(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, [teacherId]);

  return (
    <>
      <UserNavbar />
      <div style={{ display: "flex" }}>
        <UserSidebar />
        <div className="session-container">
          <div className="session-card">
            <h3 style={{ marginTop: "25px" }}>Accepted Chat Users</h3>

            {loading && <p className="session-empty">Loading...</p>}

            {senders.length === 0 && !loading && (
              <p className="session-empty">No users available for session</p>
            )}

            {senders.map((sender) => (
              <div key={sender.senderId} className="request-item">
                <div>
                  <div className="request-item-text">{sender.senderName}</div>
                  <div className="request-sub">
                    Sender ID: {sender.senderId}
                  </div>
                </div>

                <button
                  className="session-btn"
                  onClick={() =>
                    navigate("/user/session/create", {
                      state: {
                        learnerId: sender.senderId,
                        learnerName: sender.senderName,
                        teacherId,
                      },
                    })
                  }
                >
                  Create Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Session;