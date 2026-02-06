// src/api/authApi.js
import API from "./axiosConfig";

/* ================= AUTH ================= */

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

/* ================= USER & SKILL ================= */

export const AddUserSkill = (formData) =>
  API.post("/userskill/save", formData);

export const getAllSkills = () => API.get("/skill/all");

export const getMatchedUsers = (teachSkillId, learnSkillId) =>
  API.get(
    `/user/match?teachSkillId=${teachSkillId}&learnSkillId=${learnSkillId}`
  );

export const getClickedProfile = (uid) =>
  API.get(`/user/sendprofile?uid=${uid}`);

export const SendRequestapi = (requestData) =>
  API.post("/user/sendrequest", requestData);

export const FetchNotifications = (uid) =>
  API.get(`/user/notifications?uid=${uid}`);

export const AcceptRequestapi = (request_id) =>
  API.get(`/user/acceptrequest?request_id=${request_id}`);

export const RejectRequestapi = (request_id) =>
  API.get(`/user/rejectrequest?request_id=${request_id}`);

export const SendRequest = (sender_id, receiver_id) =>
  API.get(
    `/user/checkRequest?sender_id=${sender_id}&receiver_id=${receiver_id}`
  );

export const getAcceptedChatRequests = (receiverId) =>
  API.get(`/chat/accepted-requests?receiver_id=${receiverId}`);

export const getFullProfile = (uid) =>
  API.get(`/user/profile/${uid}`);

/* ================= SESSION & CONFIRM ================= */

export const getAcceptedRequests = (teacherId) =>
  API.get(`/session/accepted-requests/${teacherId}`);

export const createSession = (data) =>
  API.post("/session/create", data);

export const getConfirmations = (uid) =>
  API.get(`/confirm/${uid}`);

export const confirmSession = (data) =>
  API.post(`/confirm`, data);
