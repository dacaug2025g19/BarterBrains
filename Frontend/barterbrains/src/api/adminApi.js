import API from "./authApi";

/* =========================
   DASHBOARD
   ========================= */
export const getAdminDashboard = () =>
  API.get("/admin/dashboard");

/* =========================
   USERS
   ========================= */
export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

/* =========================
   SKILLS
   ========================= */

// GET ALL SKILLS
export const getAllAdminSkills = () =>
  API.get("/admin/skills");

// ADD SKILL
// 🔴 Payload MUST MATCH CreateSkillDTO
// {
//   sname,
//   skdesc,
//   cid,
//   basepoints
// }
export const addSkill = (data) =>
  API.post("/admin/skills", data);

// UPDATE SKILL
// 🔴 Payload MUST MATCH UpdateSkillDTO
export const updateSkill = (id, data) =>
  API.put(`/admin/skills/${id}`, data);

// DELETE SKILL
export const deleteSkill = (id) =>
  API.delete(`/admin/skills/${id}`);

/* =========================
   CATEGORIES
   ========================= */

// GET ALL CATEGORIES (dropdown + listing)
export const getAllCategories = () =>
  API.get("/admin/categories");

// ADD CATEGORY
export const addCategory = (data) =>
  API.post("/admin/categories", data);

// DELETE CATEGORY
export const deleteCategory = (id) =>
  API.delete(`/admin/categories/${id}`);

/* =========================
   REPORTS
   ========================= */
export const getSessions = () =>
  API.get("/admin/reports/sessions");

export const getBookings = () =>
  API.get("/admin/reports/bookings");
