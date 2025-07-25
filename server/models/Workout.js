// models/Workout.js
import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    category: {
      type: String,
      required: [true, "Workout category is required"],
      trim: true,
    },
    workoutName: {
      type: String,
      required: [true, "Workout name is required"],
      trim: true,
    },
    sets: {
      type: Number,
      default: 0,
      min: [0, "Sets cannot be negative"],
    },
    reps: {
      type: Number,
      default: 0,
      min: [0, "Reps cannot be negative"],
    },
    weight: {
      type: Number,
      default: 0,
      min: [0, "Weight cannot be negative"],
    },
    duration: {
      type: Number, // in minutes
      default: 0,
      min: [0, "Duration cannot be negative"],
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: [0, "Calories burned cannot be negative"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", WorkoutSchema);
