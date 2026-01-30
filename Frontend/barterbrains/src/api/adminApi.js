
import axios from "axios";

const netAPI = axios.create({
  baseURL: "https://localhost:7124/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAdminDashboard = () =>
  netAPI.get("/admin/dashboard");

export const getAllUsers = () =>
  netAPI.get("/admin/users");

export const deleteUser = (id) =>
  netAPI.delete(`/admin/users/${id}`);

// GET ALL SKILLS
export const getAllAdminSkills = () =>
  netAPI.get("/admin/skills");

// ADD NEW SKILL
export const addSkill = (data) =>
  netAPI.post("/admin/skills", data);

// UPDATE SKILL
export const updateSkill = (id, data) =>
  netAPI.put(`/admin/skills/${id}`, data);

// DELETE SKILL
export const deleteSkill = (id) =>
  netAPI.delete(`/admin/skills/${id}`);

/* =========================
   CATEGORIES
   ========================= */

// GET ALL CATEGORIES (dropdown + listing)
export const getAllCategories = () =>
  netAPI.get("/admin/categories");

// ADD CATEGORY
export const addCategory = (data) =>
  netAPI.post("/admin/categories", data);

// DELETE CATEGORY
export const deleteCategory = (id) =>
  netAPI.delete(`/admin/categories/${id}`);

/* =========================
   REPORTS
   ========================= */
export const getSessions = () =>
  netAPI.get("/admin/reports/sessions");

export const getBookings = () =>
  netAPI.get("/admin/reports/bookings");
