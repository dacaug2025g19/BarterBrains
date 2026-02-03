import React, { useEffect, useState } from "react";
import "../css/Session.css";
import { getAcceptedRequests } from "../api/sessionApi";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const Session = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const teacherId = storedUser
    ? JSON.parse(storedUser).uid
    : Number(localStorage.getItem("uid"));

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <h3>Accepted Requests</h3>

            {loading && <p className="session-empty">Loading...</p>}

            {!loading && requests.length === 0 && (
              <p className="session-empty">No accepted requests</p>
            )}

            {!loading &&
              requests.map((req) => (
                <div key={req.requestId} className="request-item">
                  <div>
                    <div className="request-item-text">{req.learnerName}</div>
                    <div className="request-sub">
                      Learner ID: {req.learnerId}
                    </div>
                  </div>

                  <button
                    className="session-btn"
                    onClick={() =>
                      navigate("/user/session/create", {
                        state: {
                          learnerId: req.learnerId,
                          learnerName: req.learnerName,
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
