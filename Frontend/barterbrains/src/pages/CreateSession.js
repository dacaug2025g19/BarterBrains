import React, { useEffect, useState } from "react";
import "../css/Session.css";
import { createSession } from "../api/sessionApi";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CreateSession = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 ALWAYS define hooks first
  const [mode, setMode] = useState("");
  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [msg, setMsg] = useState("");

  const state = location.state;

  // ✅ FETCH SKILLS
  useEffect(() => {
    if (!state) return;

    axios
      .get(`http://localhost:8082/skills/teacher/${state.teacherId}`)
      .then((res) => setSkills(res.data || []))
      .catch(() => setSkills([]));
  }, [state]);

  // ❗ conditional return AFTER hooks (this is OK)
  if (!state) {
    return <p className="session-empty">Invalid navigation</p>;
  }

  const { learnerId, learnerName, teacherId } = state;

  const handleSubmit = () => {
    if (!mode || !skillId || !date || !startTime || !endTime) {
      setMsg("Please fill all fields");
      return;
    }

    if (endTime <= startTime) {
      setMsg("End time must be after start time");
      return;
    }

    const payload = {
      teacherUid: teacherId,
      learnerUid: learnerId,
      mode,
      skillId: Number(skillId),
      sDate: date,
      startTime,
      endTime,
    };

    createSession(payload)
      .then(() => {
        setMsg("Session created successfully ✅");
        setTimeout(() => navigate("/user/session"), 1200);
      })
      .catch(() => setMsg("Session creation failed ❌"));
  };

  return (
    <div className="session-container">
      <div className="session-card">
        <h3>Create Session for {learnerName}</h3>

        <select
          className="session-input"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="">Select Mode</option>
          <option value="learn">Learn</option>
          <option value="swap">Swap</option>
        </select>

        <select
          className="session-input"
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
        >
          <option value="">Select Skill</option>
          {skills.map((skill) => (
            <option key={skill.sid} value={skill.sid}>
              {skill.sname}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="session-input"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="session-input"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="time"
          className="session-input"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button className="session-btn" onClick={handleSubmit}>
          Confirm & Create Session
        </button>

        {msg && <div className="session-msg">{msg}</div>}
      </div>
    </div>
  );
};

export default CreateSession;
