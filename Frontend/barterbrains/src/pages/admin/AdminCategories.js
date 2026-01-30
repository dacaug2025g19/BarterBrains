import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  getAllAdminSkills,
} from "../../api/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../css/admin.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // ADD CATEGORY FORM
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catRes, skillRes] = await Promise.all([
        getAllCategories(),
        getAllAdminSkills(),
      ]);

      setCategories(catRes.data);
      setSkills(skillRes.data);
    } catch {
      alert("Failed to load categories or skills");
    }
  };

  const handleAddCategory = () => {
    if (!name.trim() || !desc.trim()) {
      alert("Category name and description are required");
      return;
    }

    addCategory({
      name: name,
      description: desc,
    })
      .then(() => {
        setName("");
        setDesc("");
        loadData();
      })
      .catch((err) => {
        alert(
          err.response?.data?.message ||
            err.response?.data ||
            "Failed to add category"
        );
      });
  };

  const handleDeleteCategory = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    deleteCategory(id)
      .then(loadData)
      .catch((err) => {
        alert(
          err.response?.data ||
            "Cannot delete category (may have skills)"
        );
      });
  };

  // GROUP SKILLS BY CATEGORY ID
  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.cid] = acc[skill.cid] || [];
    acc[skill.cid].push(skill);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="admin-container">
        <h2>Manage Categories</h2>

        {/* ADD CATEGORY */}
        <div className="admin-card skill-add-card">
          <input
            className="admin-input"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="admin-input"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button className="admin-btn" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>

        {/* CATEGORY LIST */}
        <div className="category-skill-list">
          {categories.length === 0 && (
            <p className="admin-empty">No categories found</p>
          )}

          {categories.map((cat) => {
            const isOpen = expandedCategory === cat.cid;
            const categorySkills = skillsByCategory[cat.cid] || [];

            return (
              <div className="category-card" key={cat.cid}>
                {/* CATEGORY HEADER */}
                <div
                  className="category-header"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setExpandedCategory(isOpen ? null : cat.cid)
                  }
                >
                  <div>
                    <h3>{cat.cname}</h3>
                    <p>{cat.cdesc}</p>
                  </div>

                  <button
                    className="admin-btn danger"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent expand
                      handleDeleteCategory(cat.cid);
                    }}
                  >
                    Delete
                  </button>
                </div>

                {/* SKILLS INSIDE CATEGORY */}
                {isOpen && (
                  <div className="category-skill-items">
                    {categorySkills.length === 0 && (
                      <p className="admin-empty">
                        No skills in this category
                      </p>
                    )}

                    {categorySkills.map((skill) => (
                      <div
                        className="category-skill-row"
                        key={skill.sid}
                      >
                        <div className="skill-info">
                          <span className="skill-name">
                            {skill.sname}
                          </span>
                          <span className="skill-desc">
                            {skill.description}
                          </span>
                        </div>

                        <span className="skill-points">
                          {skill.basepoints} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
