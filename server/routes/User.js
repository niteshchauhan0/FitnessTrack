// routes/User.js

import express from "express";
import {
  UserRegister,
  UserLogin,
  getUserDashboard,
  getWorkoutsByDate,
  addWorkout,
} from "../controllers/User.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// ========== Auth Routes ==========
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

// ========== Protected Routes ==========
router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workouts", verifyToken, getWorkoutsByDate); // changed from /workout to /workouts (more RESTful)
router.post("/workouts", verifyToken, addWorkout);        // changed from /workout to /workouts

export default router;
