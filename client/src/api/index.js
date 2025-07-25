// src/api/index.js
import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 10000, // optional: handles hanging requests
});

// Request interceptor (optional enhancement)
API.interceptors.request.use(
  (config) => {
    // Future logic like token injection can go here
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const UserSignUp = async (data) => {
  return API.post("/user/signup", data);
};

export const UserSignIn = async (data) => {
  return API.post("/user/signin", data);
};

// Dashboard API
export const getDashboardDetails = async (token) => {
  return API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all workouts (optionally filtered by date)
export const getWorkouts = async (token, date) => {
  return API.get("/user/workout", {
    headers: { Authorization: `Bearer ${token}` },
    params: date ? { date } : {},
  });
};

// Add a new workout
export const addWorkout = async (token, data) => {
  return API.post("/user/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
