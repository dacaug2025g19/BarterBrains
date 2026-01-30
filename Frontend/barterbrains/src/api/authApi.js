// src/api/authApi.js

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = (data) => {
  return API.post("/user/login", data);
};


export const registerUser = (userData) => {
  return API.post("/user/register", userData);
};


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
};

export const getMatchedUsers = (teachSkillId, learnSkillId) => {
  return API.get(
    `/user/match?teachSkillId=${teachSkillId}&learnSkillId=${learnSkillId}`
  );
};

export const getUserToken = () => {
  return localStorage.getItem("token");
};


export const getAdminToken = () => {
  return localStorage.getItem("admin_token");
};

//GET clicked user Profile
export const getClickedProfile = (uid) => {
  return API.get(`/user/sendprofile?uid=${uid}`);
} 

export const SendRequestapi = (requestData) => {
  return API.post("/user/sendrequest", requestData);
}

export const FetchNotifications = (uid) => {
  return API.get(`/user/notifications?uid=${uid}`);
}

export const AcceptRequestapi = (request_id) => {
  return API.get(`/user/acceptrequest?request_id=${request_id}`);
}

export const RejectRequestapi = (request_id) => {
  return API.get(`/user/rejectrequest?request_id=${request_id}`);
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
