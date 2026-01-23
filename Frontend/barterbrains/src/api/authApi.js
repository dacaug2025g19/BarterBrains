// src/api/authApi.js

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// LOGIN
export const loginUser = (email, password) => {
  return API.post("/user/login", {
    email: email,
    password: password,
  });
};

// REGISTER
export const registerUser = (userData) => {
  return API.post("/user/register", userData);
};

// LOGOUT (frontend only)
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// GET STORED TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// ATTACH TOKEN TO EVERY REQUEST
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
