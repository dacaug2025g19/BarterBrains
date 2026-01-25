import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";
import "../css/UserProfile.css";

const DEFAULT_IMG =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState("");

  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);

  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("");
  const [certificationUrl, setCertificationUrl] = useState("");

  const [profileImg, setProfileImg] = useState(DEFAULT_IMG);
  const [showImgMenu, setShowImgMenu] = useState(false);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user) return;

    axios
      .get("http://localhost:8081/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAbout(res.data.about ?? "");
        setTeachSkills(res.data.teachSkills ?? []);
        setLearnSkills(res.data.learnSkills ?? []);
        setExperienceLevel(res.data.experienceLevel ?? "");
        if (res.data.profileImg) setProfileImg(res.data.profileImg);
      })
      .catch(() => console.log("Profile fetch failed"));
  }, [user, token]);

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImg(URL.createObjectURL(file));
    setShowImgMenu(false);
  };

  const removeImage = () => {
    setProfileImg(DEFAULT_IMG);
    setShowImgMenu(false);
  };

  // ================= SAVE PROFILE =================
  const saveProfile = async () => {
    try {
      await Promise.all([
        ...teachSkills.map((skill) =>
          axios.post("http://localhost:8081/skill/save", {
            uid: user.uid,
            sid: skill,
            type: "teach",
            exp_level: experienceLevel,
            cert_url: certificationUrl,
            bio: about,
          })
        ),
        ...learnSkills.map((skill) =>
          axios.post("http://localhost:8081/skill/save", {
            uid: user.uid,
            sid: skill,
            type: "learn",
          })
        ),
      ]);

      alert("Profile saved successfully");
      setEditMode(false);
    } catch {
      alert("Error saving profile");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <UserNavbar />

      <div className="user-layout">
        <UserSidebar />

        <div className="profile-wrapper">
          {/* ================= HEADER ================= */}
          <div className="profile-header">
            <div className="profile-img-wrapper">
              <img
                src={profileImg}
                alt="profile"
                className="profile-image"
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
              <p>{user.email}</p>
              <p className="sub-info">📞 {user.phone}</p>
              <p className="sub-info">🎂 {user.bdate}</p>
            </div>

            <div className="header-actions">
              <button
                className="btn-toggle"
                onClick={() => {
                  setEditMode(!editMode);
                  setShowImgMenu(false);
                }}
              >
                {editMode ? "View Mode" : "Edit Profile"}
              </button>

              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="profile-grid">
            {/* ABOUT */}
            <div className="profile-card">
              <h4>About Me</h4>
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

            {/* SKILLS */}
            <div className="profile-card">
              <h4>My Skills</h4>

              <p className="skill-title">I Can Teach</p>
              <div className="skill-list">
                {teachSkills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>

              {editMode && (
                <div className="skill-input">
                  <input
                    value={teachInput}
                    onChange={(e) => setTeachInput(e.target.value)}
                    placeholder="Add skill"
                  />
                  <button
                    onClick={() => {
                      if (!teachInput) return;
                      setTeachSkills((prev) => [...prev, teachInput]);
                      setTeachInput("");
                    }}
                  >
                    +
                  </button>
                </div>
              )}

              <p className="skill-title">I Want To Learn</p>
              <div className="skill-list">
                {learnSkills.map((s, i) => (
                  <span key={i} className="skill-chip purple">{s}</span>
                ))}
              </div>

              {editMode && (
                <div className="skill-input">
                  <input
                    value={learnInput}
                    onChange={(e) => setLearnInput(e.target.value)}
                    placeholder="Add skill"
                  />
                  <button
                    onClick={() => {
                      if (!learnInput) return;
                      setLearnSkills((prev) => [...prev, learnInput]);
                      setLearnInput("");
                    }}
                  >
                    +
                  </button>
                </div>
              )}

              <p className="skill-title">Experience Level</p>
              {editMode ? (
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              ) : (
                <p className="muted">{experienceLevel || "Not specified"}</p>
              )}

              {editMode && (
                <>
                  <p className="skill-title">Certification URL</p>
                  <input
                    value={certificationUrl}
                    onChange={(e) => setCertificationUrl(e.target.value)}
                    placeholder="Paste certification link"
                  />
                </>
              )}
            </div>
          </div>

          {/* SAVE BUTTON RIGHT */}
          {editMode && (
            <div className="profile-actions">
              <button className="btn-save" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
