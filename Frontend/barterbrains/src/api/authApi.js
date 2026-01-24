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
