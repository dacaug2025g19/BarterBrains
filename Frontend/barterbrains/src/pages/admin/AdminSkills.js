import React, { useEffect, useState } from "react";
import {
  getAllAdminSkills,
  addSkill,
  deleteSkill,
  updateSkill,
  getAllCategories
} from "../../api/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../css/admin.css";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [points, setPoints] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSkills();
    loadCategories();
  }, []);

  const loadSkills = () => {
    getAllAdminSkills().then(res => setSkills(res.data));
  };

  const loadCategories = () => {
    getAllCategories().then(res => setCategories(res.data));
  };

  const resetForm = () => {
    setName("");
    setDesc("");
    setPoints("");
    setCategoryId("");
    setEditingId(null);
  };

  const handleSave = () => {
    if (!name || !desc || !points || !categoryId) {
      alert("All fields required");
      return;
    }

    const payload = {
      sname: name,
      skdesc: desc,
      cid: Number(categoryId),
      basepoints: Number(points)
    };

    if (editingId) {
      updateSkill(editingId, payload).then(() => {
        resetForm();
        loadSkills();
      });
    } else {
      addSkill(payload).then(() => {
        resetForm();
        loadSkills();
      });
    }
  };

  // GROUP SKILLS BY CATEGORY NAME
  const groupedSkills = skills.reduce((acc, skill) => {
    acc[skill.categoryName] = acc[skill.categoryName] || [];
    acc[skill.categoryName].push(skill);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="admin-container">
        <h2>Manage Skills</h2>

        {/* ADD / EDIT SKILL */}
        <div className="admin-card skill-add-card">
          <input
            className="admin-input"
            placeholder="Skill Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            className="admin-input"
            placeholder="Description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />

          <input
            type="number"
            className="admin-input"
            placeholder="Skill Points"
            value={points}
            onChange={e => setPoints(e.target.value)}
          />

          <select
            className="admin-input"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.cid} value={c.cid}>
                {c.cname}
              </option>
            ))}
          </select>

          <button className="admin-btn" onClick={handleSave}>
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </div>

        {/* SKILLS BY CATEGORY */}
        <div className="category-skill-list">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div className="category-card" key={category}>
              <div className="category-header">
                <h3>{category}</h3>
                <p>{items.length} skills</p>
              </div>

              <div className="category-skill-items">
                {items.map(skill => (
                  <div className="category-skill-row" key={skill.sid}>
                    <div className="skill-info">
                      <span className="skill-name">
                        {skill.sname}
                      </span>
                      <span className="skill-desc">
                        {skill.description}
                      </span>
                    </div>

                    {/* ✅ SKILL POINTS SHOWN CLEARLY */}
                    <div className="skill-actions">
                      <span className="skill-points">
                        {skill.basepoints} pts
                      </span>

                      <button
                        className="admin-btn secondary"
                        onClick={() => {
                          setEditingId(skill.sid);
                          setName(skill.sname);
                          setDesc(skill.description);
                          setPoints(skill.basepoints);
                          setCategoryId(skill.cid);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="admin-btn danger"
                        onClick={() =>
                          deleteSkill(skill.sid).then(loadSkills)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
