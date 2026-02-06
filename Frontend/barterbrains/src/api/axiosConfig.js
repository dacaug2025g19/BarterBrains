import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

API.interceptors.request.use((config) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile && profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`;
  }

  return config;
});


export default API;
