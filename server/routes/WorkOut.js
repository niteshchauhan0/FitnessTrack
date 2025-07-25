import express from "express";
import { getAllWorkouts, createWorkout } from "../controllers/Workout.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllWorkouts);
router.post("/", verifyToken, createWorkout);

export default router;
