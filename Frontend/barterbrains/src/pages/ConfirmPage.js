import React, { useEffect, useState } from "react";
import axios from "axios";

const ConfirmPage = () => {
  const [sessions, setSessions] = useState([]);
  const uid = Number(localStorage.getItem("uid")); // logged-in user id

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const fetchConfirmations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/confirm/${uid}`
      );
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to load confirmations", err);
    }
  };

  const handleConfirm = async (session) => {
    let role = "";

    if (uid === session.teacherUid) {
      role = "teacher";
    } else if (uid === session.learnerUid) {
      role = "learner";
    } else {
      alert("You are not part of this session");
      return;
    }

    try {
      await axios.post("http://localhost:8082/confirm", {
        bsid: session.bsid,
        role: role
      });

      alert("Confirmation submitted");
      fetchConfirmations(); // refresh UI
    } catch (err) {
      console.error("Confirmation failed", err);
      alert("Error while confirming session");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Session Confirmation</h2>

      {sessions.length === 0 && <p>No sessions to confirm</p>}

      {sessions.map((s) => (
        <div
          key={s.bsid}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "6px"
          }}
        >
          <p><strong>Session ID:</strong> {s.seid}</p>
          <p><strong>Mode:</strong> {s.mode}</p>

          <p>
            <strong>Teacher:</strong>{" "}
            {s.teacherConfirm === "yes" ? "yes" : "no"}
          </p>

          <p>
            <strong>Learner:</strong>{" "}
            {s.learnerConfirm === "yes" ? "yes" : "no"}
          </p>

          {/* Show confirm button only if THIS user has not confirmed */}
          {(uid === s.teacherUid && s.teacherConfirm !== "yes") ||
          (uid === s.learnerUid && s.learnerConfirm !== "yes") ? (
            <button onClick={() => handleConfirm(s)}>
              Confirm
            </button>
          ) : (
            <p style={{ color: "green" }}>You have confirmed</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfirmPage;
