// src/api/authApi.js

import axios from "axios";

/* =========================
   COMMON API INSTANCE
   ========================= */

const API = axios.create({
  baseURL: "https://localhost:7124/api", // 🔴 CHANGE PORT IF NEEDED
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   COMMON LOGIN (USER + ADMIN)
   ========================= */

export const loginCommon = (data) => {
  return API.post("/auth/login", data);
};

/* =========================
   USER APIs (UNCHANGED)
   ========================= */

export const registerUser = (userData) => {
  return API.post("/user/register", userData);
};





export const AddUserSkill = (skillData) => {
  return API.post("/user/skill", skillData);
};

export const getAllSkills = () => {
  return API.get("/skill/all");
};

export const getMatchedUsers = (teachSkillId, learnSkillId) => {
  return API.get(
    `/user/match?teachSkillId=${teachSkillId}&learnSkillId=${learnSkillId}`
  );
};

/* =========================
   TOKEN HELPERS
   ========================= */

export const getUserToken = () => {
  return localStorage.getItem("token");
};


export const getAdminToken = () => {
  return localStorage.getItem("admin_token");
};

/* =========================
   ATTACH TOKEN AUTOMATICALLY
   ========================= */

//GET clicked user Profile
export const getClickedProfile = (uid) => {
  return API.get(`/user/sendprofile?uid=${uid}`);
} 

export const SendRequest = (requestData) => {
  // return API.post("/user/sendrequest", requestData);
}


API.interceptors.request.use((config) => {
  const adminToken = getAdminToken();
  const userToken = getUserToken();

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default API;
