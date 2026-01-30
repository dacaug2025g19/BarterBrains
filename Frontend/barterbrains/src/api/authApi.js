// src/api/authApi.js

import axios from "axios";

/* =========================
   COMMON API INSTANCE
   ========================= */

const API = axios.create({

  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081"

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


// FETCH USER PROFILE
export const AddUserSkill = (formData) => {
  return API.post("/userskill/save", formData);
};


// FETCH SkillS

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
