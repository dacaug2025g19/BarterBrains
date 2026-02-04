import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaBirthdayCake, FaUserGraduate, FaUserEdit, FaBookOpen, FaPlus, FaCertificate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import { getFullProfile } from "../api/authApi";


import "../css/UserProfile.css";
import { AddUserSkill, getAllSkills} from "../api/authApi"


// ================= CONSTANTS =================
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
const MSGS = {
  profileSaved: "Profile saved successfully",
  profileSaveError: "Error saving profile. Please try again.",
  profileFetchError: "Profile fetch failed",
  confirmLogout: "Are you sure you want to logout?",
  confirmRemoveImg: "Are you sure you want to remove your profile image?",
  duplicateSkill: "Skill already added!",
  invalidCertUrl: "Please enter a valid certification URL.",
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  
  const token = localStorage.getItem("token");


  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState("");

  // const [teachExpLevel, setTeachExpLevel] = useState("");
  //const [certificationUrl, setCertificationUrl] = useState("");
  const [profileImg, setProfileImg] = useState(DEFAULT_IMG);
  const [showImgMenu, setShowImgMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirm, setShowConfirm] = useState({ type: null, open: false });
  const [skills, setSkills] = useState([]);


  const [teachInput, setTeachInput] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);

  const [learnInput, setLearnInput] = useState("");
  const [learnSkills, setLearnSkills] = useState([]);


  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await getFullProfile(user.uid);
        const data = res.data;

        console.log("Fetched profile:", data);

        // BIO
        setAbout(data.bio || "");

        // LEARN SKILLS (names already)
        setLearnSkills(data.learnSkills);
        console.log("Learn skills from backend:", data.learnSkillId);
        // TEACH SKILLS (convert backend -> UI format)
        const formattedTeach = (data.teachSkills || []).map(ts => {
          const matchedSkill = skills.find(s => s.sname === ts.skillName);

          return {
            skillId: matchedSkill?.sid,     // 🔥 convert name → id
            experienceLevel: ts.experienceLevel,
            certificate: null,
            certificateUrl: ts.certificateUrl
          };
        });

        setTeachSkills(formattedTeach);



      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    // wait till skills are loaded (important!)
    if (skills.length > 0) {
      fetchProfile();
    }

  }, [user, skills]);

  const confirmRemoveImage = () => {
    setProfileImg(DEFAULT_IMG);
    setShowImgMenu(false);
    setShowConfirm({ type: null, open: false });
  };
  // ================= SAVE PROFILE =================

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getAllSkills();
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to fetch skills", err);
      }
    };

    fetchSkills();
  }, []);

  const getSkillNameById = (id) => {
    const skill = skills.find((s) => s.sid === Number(id));
    return skill ? skill.sname : "";
  };

  const addTeachSkill = () => {
    if (!teachInput) return;

    if (teachSkills.some(s => s.skillId === Number(teachInput))) {
      setError(MSGS.duplicateSkill);
      return;
    }

    setTeachSkills(prev => [
      ...prev,
      {
        skillId: Number(teachInput),
        experienceLevel: "",
        certificate: null
      }
    ]);

    setTeachInput("");
  };

  const saveProfile = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("uid", user.uid);
      formData.append("bio", about);

      // Data is in the form of formData
      teachSkills.forEach((skill, index) => {
        formData.append(`teachSkills[${index}].skillId`, skill.skillId);
        formData.append(
          `teachSkills[${index}].experienceLevel`,
          skill.experienceLevel
        );
        formData.append(
          `teachSkills[${index}].certificate`,
          skill.certificate
        );
      });

      learnSkills.forEach((s, index) => {
        formData.append(`learnSkillId[${index}]`, s.skillId);
      });


      console.table("This fromdata" + [...formData.entries()]);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await AddUserSkill(formData);

      setSuccess(MSGS.profileSaved);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError(MSGS.profileSaveError);
    } finally {
      setLoading(false);
    }
  };


  // ================= LOGOUT =================

  const handleLogout = () => {
    setShowConfirm({ type: "logout", open: true });
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    setShowConfirm({ type: null, open: false });
  };


  // ================= SKILL HANDLERS =================
  const addSkill = (type) => {
    if (type === "learn") {
      const selected = skills.find(s => s.sid === Number(learnInput));

      setLearnSkills(prev => [
        ...prev,
        {
          skillId: selected.sid,
          skillName: selected.sname
        }
      ]);

      setLearnInput("");
    }
  };

  // =================  HANDLERS =================
  const handleCertificateChange = (skillId, file) => {
    setTeachSkills(prev =>
      prev.map(skill =>
        skill.skillId === skillId
          ? { ...skill, certificate: file }
          : skill
      )
    );
  };

  const handleExperienceChange = (skillId, level) => {
    setTeachSkills(prev =>
      prev.map(skill =>
        skill.skillId === skillId
          ? { ...skill, experienceLevel: level }
          : skill
      )
    );
  };

  // ================= RENDER =================
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <UserNavbar />
      <div className="user-layout">
        <UserSidebar />
        <div className="profile-wrapper">
          {/* Loading Overlay */}
          {loading && (
            <div className="overlay loading-overlay">
              <div className="loader"></div>
            </div>
          )}
          {/* Popup Messages */}
          <div className="popup-container">
            {error && (
              <div className="popup-message error" onClick={() => setError("")}>{error}</div>
            )}
            {success && (
              <div className="popup-message success" onClick={() => setSuccess("")}>{success}</div>
            )}
          </div>
          {/* Confirm Dialog */}
          {showConfirm.open && (
            <div className="overlay confirm-overlay">
              <div className="confirm-box">
                <p>
                  {showConfirm.type === "logout"
                    ? MSGS.confirmLogout
                    : MSGS.confirmRemoveImg}
                </p>
                <div className="confirm-actions">
                  <button
                    className="btn-save"
                    onClick={
                      showConfirm.type === "logout"
                        ? confirmLogout
                        : confirmRemoveImage
                    }
                  >
                    Yes
                  </button>
                  <button
                    className="btn-logout"
                    onClick={() => setShowConfirm({ type: null, open: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* ================= HEADER ================= */}
          <div className="profile-header">

            <div className="user-info">
              <h2 className="user-name">{user.uname}</h2>

              <p className="info-line">
                <FaEnvelope className="icon-info" />
                <span>{user.email}</span>
              </p>

              <p className="info-line">
                <FaPhone className="icon-info" />
                <span>{user.phone}</span>
              </p>

              <p className="info-line">
                <FaBirthdayCake className="icon-info" />
                <span>{user.bdate}</span>
              </p>

              <p className="info-line points">
                Points: {user.points}
              </p>
            </div>

            <div className="header-actions">
              <button
                className="btn-toggle btn-glow"
                onClick={() => {
                  setEditMode(!editMode);
                  setShowImgMenu(false);
                  setError("");
                  setSuccess("");
                }}
              >
                <FaUserEdit style={{ marginRight: 8 }} />
                {editMode ? "View Mode" : "Edit Profile"}
              </button>
              <button className="btn-logout btn-glow" onClick={handleLogout}>
                <span style={{ marginRight: 8 }}>&#x1F6AA;</span>Logout
              </button>
            </div>
          </div>
          {/* ================= CONTENT ================= */}
          <div className="profile-grid">
            {/* ABOUT */}
            <div className="profile-card">
              <h4><FaBookOpen className="icon-section" /> About Me</h4>
              {editMode ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="muted">{about || "No bio yet"}</p>
              )}
            </div>
            {/* I CAN TEACH */}
            <div className="profile-card">
              <h4><FaUserGraduate /> I Can Teach</h4>
              {!editMode && (
                <div className="skill-list">
                  {teachSkills.length === 0 ? (
                    <span className="skill-chip muted">No teach skills added</span>
                  ) : (
                    teachSkills.map(skill => (
                      <div key={skill.skillId} className="skill-chip-column">
                        <span className="skill-chip">
                          {getSkillNameById(skill.skillId)}
                        </span>
                        <span className="exp-text">
                          {skill.experienceLevel}
                        </span>

                        {skill.certificateUrl
                          && (
                            <a
                              href={`http://localhost:8081/${skill.certificateUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="cert-link"
                            >
                              View Certificate
                            </a>
                          )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {editMode && (
                <>
                  {/* ===== ADD NEW TEACH SKILL ===== */}
                  <div className="skill-input">

                    {/* SELECT SKILL (RESTORED ✅) */}
                    <select className="form-select" value={teachInput} onChange={(e) => setTeachInput(e.target.value)} >
                      <option value="">Select skill</option>
                      {skills.map(skill => (
                        <option key={skill.sid} value={skill.sid}>
                          {skill.sname}
                        </option>))}
                    </select>

                    <button className="btn-skill-add" onClick={addTeachSkill}>
                      <FaPlus />
                    </button>
                  </div>

                  {/* ===== ADDED TEACH SKILLS ===== */}
                  <div className="skill-list">

                    {/* SHOW DEFAULT FIELDS WHEN NO SKILL IS ADDED */}
                    {teachSkills.length === 0 && (
                      <div className="skill-chip-column">

                        <span className="skill-chip muted">
                          Select a skill
                        </span>

                        <select className="form-select">
                          <option>Experience Level</option>
                        </select>

                        <label className="cert-label">
                          <FaCertificate /> Certification
                        </label>
                        <input type="file" />
                      </div>
                    )}

                    {/* NORMAL FLOW AFTER CLICKING PLUS */}
                    {teachSkills.map(skill => (
                      <div key={skill.skillId} className="skill-chip-column">

                        <span className="skill-chip">
                          {getSkillNameById(skill.skillId)}
                        </span>

                        <select
                          className="form-select"
                          value={skill.experienceLevel}
                          onChange={(e) =>
                            handleExperienceChange(skill.skillId, e.target.value)
                          }
                        >
                          <option value="">Experience Level</option>
                          <option value="BEGINNER">Beginner</option>
                          <option value="INTERMEDIATE">Intermediate</option>
                          <option value="EXPERT">Expert</option>
                        </select>

                        <label className="cert-label">
                          <FaCertificate /> Certification
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            handleCertificateChange(
                              skill.skillId,
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* I WANT TO LEARN */}
            <div className="profile-card">
              <h4><FaBookOpen /> I Want To Learn</h4>
              {editMode && (
                <div className="skill-input">
                  <select className="form-select" value={learnInput} onChange={(e) => setLearnInput(e.target.value)} >
                    <option value="">Select skill</option>
                    {skills.map(skill =>
                    (<option key={skill.sid} value={skill.sid}>
                      {skill.sname}
                    </option>))}
                  </select>

                  <button
                    className="btn-skill-add"
                    onClick={() => addSkill("learn")}
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
              <div className="skill-list">
                {learnSkills.length > 0 ? (
                  learnSkills.map((s, i) => (
                    <span key={i}>{s.skillName}</span>
                  ))

                ) : (
                  !editMode && <p className="muted">No skills selected</p>
                )}
              </div>
            </div>

            {/* SAVE BUTTON RIGHT */}
            {editMode && (
              <div className="profile-card full-width">
                <button className="btn-save" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            )}
          </div>

        </div> {/* profile-wrapper */}
      </div> {/* user-layout */}
    </>
  );
};

export default UserProfile;