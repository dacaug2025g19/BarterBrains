// src/api/authApi.js

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// LOGIN
export const loginUser = (userData) => {
  return API.post("/user/login", userData);
};

// REGISTER
export const registerUser = (userData) => {
  return API.post("/user/register", userData);
};

// FETCH USER PROFILE
export const AddUserSkill = (skillData) => {
  return API.post("/userskill/save", skillData);
}
/*
export const AddUserSkill = (data) => {
  return axios.post(
    "http://localhost:8081/userskill/save",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};*/

// FETCH SkillS
export const getAllSkills = () => {
  return API.get("/skill/all");
}

export const getMatchedUsers = (teachSkillId, learnSkillId) => {
  return API.get(`/user/match?teachSkillId=${teachSkillId}&learnSkillId=${learnSkillId}`);
}

// GET STORED TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};



// ATTACH TOKEN TO EVERY REQUEST
// Interceptor = a function that runs automatically before every axios request “Before sending any request, run this code first.”
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default API;
