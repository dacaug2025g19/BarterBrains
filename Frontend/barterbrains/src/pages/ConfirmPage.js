import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ConfirmPage.css";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const ConfirmPage = () => {
  const [sessions, setSessions] = useState([]);
  const [feedbackMap, setFeedbackMap] = useState({});
  const uid = Number(localStorage.getItem("uid"));

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const fetchConfirmations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/confirm/${uid}`);
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to load confirmations", err);
    }
  };

  const handleConfirm = async (session) => {
    let role = "";

    if (uid === session.teacherUid) role = "teacher";
    else if (uid === session.learnerUid) role = "learner";
    else {
      alert("You are not part of this session");
      return;
    }

    try {
      await axios.post("http://localhost:8080/confirm", {
        bsid: session.bsid,
        role,
        feedback:
          role === "learner" ? feedbackMap[session.bsid] || "" : null
      });

      alert("Confirmation submitted");
      fetchConfirmations();
    } catch (err) {
      console.error("Confirmation failed", err);
      alert("Error while confirming session");
    }
  };

  return (
     <>
            <UserNavbar />
            <div className="d-flex user-layout">

                <UserSidebar />
    <div className="confirm-container">
      <h2 className="confirm-title">Session Confirmation</h2>

      {sessions
        .filter(
          (s) => !(s.teacherConfirm === "yes" && s.learnerConfirm === "yes")
        )
        .length === 0 && (
        <p className="empty-text">No sessions to confirm</p>
      )}

      {sessions
        .filter(
          (s) => !(s.teacherConfirm === "yes" && s.learnerConfirm === "yes")
        )
        .map((s) => {
          const currentUserCanConfirm =
            (uid === s.teacherUid && s.teacherConfirm !== "yes") ||
            (uid === s.learnerUid && s.learnerConfirm !== "yes");

          const currentUserConfirmed =
            (uid === s.teacherUid && s.teacherConfirm === "yes") ||
            (uid === s.learnerUid && s.learnerConfirm === "yes");

          return (
            <div key={s.bsid} className="session-card">
              <p><strong>Session ID:</strong> {s.seid}</p>
              <p><strong>Mode:</strong> {s.mode}</p>
              <p><strong>End Time:</strong> {s.endTime}</p>

              <p>
                <strong>Teacher:</strong> {s.tName}{" "}
                <span
                  className={`status ${
                    s.teacherConfirm === "yes" ? "yes" : "no"
                  }`}
                >
                  {s.teacherConfirm}
                </span>
              </p>

              <p>
                <strong>Learner:</strong> {s.lName}{" "}
                <span
                  className={`status ${
                    s.learnerConfirm === "yes" ? "yes" : "no"
                  }`}
                >
                  {s.learnerConfirm}
                </span>
              </p>

              {uid === s.learnerUid && s.learnerConfirm !== "yes" && (
                <textarea
                  placeholder="Write your feedback..."
                  value={feedbackMap[s.bsid] || ""}
                  onChange={(e) =>
                    setFeedbackMap({
                      ...feedbackMap,
                      [s.bsid]: e.target.value
                    })
                  }
                  rows={3}
                />
              )}

              {currentUserCanConfirm ? (
                <button
                  className="confirm-btn"
                  onClick={() => handleConfirm(s)}
                >
                  Confirm
                </button>
              ) : currentUserConfirmed ? (
                <p style={{ color: "#facc15", marginTop: "12px" }}>
                  Waiting for other user to confirm…
                </p>
              ) : null}
            </div>
          );
        })}
    </div>
  </div>
  </>
  );
};

export default ConfirmPage;