// src/api/authApi.js

import axios from "axios";

const API = axios.create({

  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
 
});


export const loginUser = (data) => {
  return API.post("/user/login", data);
};


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


export const SendRequest = (sender_id, receiver_id) => {
  return API.get(`/user/checkRequest?sender_id=${sender_id}&receiver_id=${receiver_id}`);
}

export const getAcceptedChatRequests = (receiverId) => {
  return API.get(`/chat/accepted-requests?receiver_id=${receiverId}`);
};

export const getFullProfile = (uid) => {
  return API.get(`user/profile/${uid}`);
}

API.interceptors.request.use((config) => {
  const userToken = getUserToken();

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  } 
  return config;
});

export default API;
