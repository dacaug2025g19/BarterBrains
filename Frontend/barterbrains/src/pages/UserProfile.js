import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaBirthdayCake, FaUserGraduate, FaUserEdit, FaBookOpen, FaPlus, FaCertificate } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import axios, { all } from "axios";
import "../css/UserProfile.css";
import { AddUserSkill, getAllSkills, loginUser } from "../api/authApi"


// ================= CONSTANTS =================
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
const API_BASE = "http://localhost:8081";
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
  const fileRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");


  // ================= STATES =================
  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("");
  const [certificationUrl, setCertificationUrl] = useState("");
  const [profileImg, setProfileImg] = useState(DEFAULT_IMG);
  const [showImgMenu, setShowImgMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirm, setShowConfirm] = useState({ type: null, open: false });
  const [profileData, setData] = useState([]);
  const [skills, setSkills] = useState([]);

  const [teachInput, setTeachInput] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);

  const [learnInput, setLearnInput] = useState("");
  const [learnSkills, setLearnSkills] = useState([]);


  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user) return;

    setAbout(user.about ?? "");
    setTeachSkills(user.teachSkills ?? []);
    setLearnSkills(user.learnSkills ?? []);
    setExperienceLevel(user.experienceLevel ?? "");
  }, [user]);


  // ================= IMAGE =================

  // ================= IMAGE =================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      // Simulate upload: Replace with actual backend upload logic
      // const formData = new FormData();
      // formData.append("image", file);
      // const res = await axios.post(`${API_BASE}/user/uploadProfileImg`, formData, { headers: { Authorization: `Bearer ${token}` } });
      // setProfileImg(res.data.url);
      setProfileImg(URL.createObjectURL(file)); // fallback for now
      setError("");
    } catch {
      setError("Image upload failed");
    } finally {
      setLoading(false);
      setShowImgMenu(false);
    }
  };

  const removeImage = () => {
    setShowConfirm({ type: "removeImg", open: true });
  };

  const confirmRemoveImage = () => {
    setProfileImg(DEFAULT_IMG);
    setShowImgMenu(false);
    setShowConfirm({ type: null, open: false });
  };

  // ================= SAVE PROFILE =================

  // ================= VALIDATION =================
  const isValidUrl = (url) => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
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

    if (teachSkills.includes(Number(teachInput))) {
      setError(MSGS.duplicateSkill);
      return;
    }

    setTeachSkills((prev) => [...prev, Number(teachInput)]);
    setTeachSkills("");
  };

  const saveProfile = async () => {
    if (!isValidUrl(certificationUrl)) {
      setError(MSGS.invalidCertUrl);
      return;
    }
    setLoading(true);
    console.log("User: " + user)
    try {
      const skillData = {
        uid: user.uid,
        about,
        experienceLevel: experienceLevel.toLowerCase(),
        certificationUrl,
        teachSkillId: teachSkills ? [Number(teachInput)] : [],          // already IDs
        learnSkillId: learnSkills ? [Number(learnInput)] : [],
      };
      console.log(skillData);
      await AddUserSkill(skillData);

      setSuccess(MSGS.profileSaved);
      setEditMode(false);
    } catch (err) {
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
    if (type === "teach" && teachInput) {
      const skillId = Number(teachInput);
      if (!teachSkills.includes(skillId)) {
        setTeachSkills([...teachSkills, skillId]);
      }
      setTeachInput("");
    }

    if (type === "learn" && learnInput) {
      if (!learnSkills.includes(Number(learnInput))) {
        setLearnSkills([...learnSkills, Number(learnInput)]);
      }
      setLearnInput("");
    }

    console.log("Teach skills:", teachSkills);

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
            <div className="profile-img-wrapper">
              <img
                src={profileImg}
                alt="profile"
                className="profile-image profile-glow"
                onClick={() => editMode && setShowImgMenu(!showImgMenu)}
              />
              {editMode && showImgMenu && (
                <div className="img-menu">
                  <label className="img-menu-item">
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <div
                    className="img-menu-item danger"
                    onClick={removeImage}
                  >
                    Remove Photo
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <h2>{user.uname}</h2>
              <p><FaEnvelope className="icon-info" /> {user.email}</p>
              <p className="sub-info"><FaPhone className="icon-info" /> {user.phone}</p>
              <p className="sub-info"><FaBirthdayCake className="icon-info" /> {user.bdate}</p>
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

              {editMode && (
                <div className="skill-input">
                  <select
                    className="form-select"
                    value={teachInput}
                    onChange={(e) => setTeachInput(e.target.value)}
                  >
                    <option value="">Select skill</option>
                    {skills.map(skill => (
                      <option key={skill.sid} value={skill.sid}>
                        {skill.sname}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn-skill-add"
                    onClick={() => addSkill("teach")}
                  >
                    <FaPlus />
                  </button>
                </div>
              )}

              <div className="skill-list">
                {teachSkills.map(id => (
                  <span key={id} className="skill-chip">
                    {getSkillNameById(id)}
                  </span>
                ))}
              </div>
            </div>


            {/* I WANT TO LEARN */}
            <div className="profile-card">
              <h4><FaBookOpen /> I Want To Learn</h4>

              {editMode && (
                <div className="skill-input">
                  <select
                    className="form-select"
                    value={learnInput}
                    onChange={(e) => setLearnInput(e.target.value)}
                  >
                    <option value="">Select skill</option>
                    {skills.map(skill => (
                      <option key={skill.sid} value={skill.sid}>
                        {skill.sname}
                      </option>
                    ))}
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
                  learnSkills.map(id => (
                    <span key={id} className="skill-chip">
                      {getSkillNameById(id)}
                    </span>
                  ))
                ) : (
                  !editMode && <p className="muted">No skills selected</p>
                )}
              </div>
            </div>
            <div className="profile-card">
              <h4><FaCertificate /> Experience Level</h4>

              {editMode ? (
                <div className="skill-input">
                  <select
                    className="form-select"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              ) : (
                <p className="muted">{experienceLevel || "Not specified"}</p>
              )}
            </div>

            <div className="profile-card">
              <h4><FaCertificate /> Certification</h4>

              {editMode ? (
                <input
                  className="form-input"
                  value={certificationUrl}
                  onChange={(e) => setCertificationUrl(e.target.value)}
                  placeholder="Paste certification link"
                />
              ) : (
                <p className="muted">
                  {certificationUrl ? (
                    <a href={certificationUrl} target="_blank" rel="noopener noreferrer">
                      View Certification
                    </a>
                  ) : (
                    "No certification added"
                  )}
                </p>
              )}
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
