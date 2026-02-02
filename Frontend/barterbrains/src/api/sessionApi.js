// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8082",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ===============================
//    GET ACCEPTED REQUESTS
//    =============================== */
// export const getAcceptedRequests = (teacherId) => {
//   return API.get(`/session/accepted-requests/${teacherId}`);
// };

// /* ===============================
//    GET TEACHER SKILLS
//    =============================== */
// export const getTeacherSkills = (teacherId) => {
//   return API.get(`/skills/teacher/${teacherId}`);
// };

// /* ===============================
//    CREATE SESSION
//    =============================== */
// export const createSession = (data) => {
//   return API.post("/session/create", data);
// };

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAcceptedRequests = (teacherId) => {
  console.log("🟣 Calling API with teacherId:", teacherId);
  return API.get(`/session/accepted-requests/${teacherId}`);
};

export const createSession = (data) => {
  return API.post("/session/create", data);
};

/* =========================
   COMPLETED SESSIONS
   (Used for red dot on Confirm)
   ========================= */
export const getConfirmations = (uid) => {
  return API.get(`/confirm/${uid}`);
};

// confirm session completion
export const confirmSession = (data) => {
  return API.post(`/confirm`, data);
};
