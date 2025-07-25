import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

// ✅ REGISTER
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    if (!email || !password || !name) {
      return next(createError(400, "Name, email, and password are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      img: img || null,
    });

    const savedUser = await newUser.save();
    const userObj = savedUser.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "9999 years",
    });

    res.status(201).json({ token, user: userObj });
  } catch (err) {
    console.error("Register Error:", err);
    next(createError(500, "Something went wrong during registration."));
  }
};

// ✅ LOGIN
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next(createError(403, "Incorrect password"));

    const userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "9999 years",
    });

    res.status(200).json({ token, user: userObj });
  } catch (err) {
    console.error("Login Error:", err);
    next(createError(500, "Login failed."));
  }
};

// ✅ DASHBOARD
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    const now = new Date();
    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date(now);
    endToday.setHours(24, 0, 0, 0);

    const totalCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      { $group: { _id: null, total: { $sum: "$caloriesBurned" } } },
    ]);

    const totalWorkouts = await Workout.countDocuments({
      user: user._id,
      date: { $gte: startToday, $lt: endToday },
    });

    const avgCalories =
      totalCalories.length && totalWorkouts
        ? totalCalories[0].total / totalWorkouts
        : 0;

    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      { $group: { _id: "$category", total: { $sum: "$caloriesBurned" } } },
    ]);

    const pieChartData = categoryCalories.map((cat, idx) => ({
      id: idx,
      value: cat.total,
      label: cat._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);

      const start = new Date(day);
      start.setHours(0, 0, 0, 0);

      const end = new Date(day);
      end.setHours(24, 0, 0, 0);

      const dayData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: start, $lt: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$caloriesBurned" },
          },
        },
      ]);

      weeks.push(`${start.getDate()}th`);
      caloriesBurnt.push(dayData[0]?.total || 0);
    }

    res.status(200).json({
      totalCaloriesBurnt: totalCalories[0]?.total || 0,
      totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCalories,
      totalWeeksCaloriesBurnt: {
        weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    next(createError(500, "Error fetching dashboard data"));
  }
};

// ✅ GET WORKOUTS BY DATE
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    const inputDate = req.query.date ? new Date(req.query.date) : new Date();

    const start = new Date(inputDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(inputDate);
    end.setHours(24, 0, 0, 0);

    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lt: end },
    });

    const totalCalories = workouts.reduce(
      (acc, w) => acc + w.caloriesBurned,
      0
    );

    res.status(200).json({
      todaysWorkouts: workouts,
      totalCaloriesBurnt: totalCalories,
    });
  } catch (err) {
    console.error("Get Workouts Error:", err);
    next(createError(500, "Error fetching today's workouts"));
  }
};

// ✅ ADD WORKOUT
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    const lines = workoutString.split(";").map((line) => line.trim());
    const workouts = [];

    for (let line of lines) {
      const parts = line.split("\n").map((p) => p.trim());

      if (!parts[0].startsWith("#") || parts.length < 5) {
        return next(createError(400, "Invalid workout format"));
      }

      const category = parts[0].substring(1).trim();
      const workoutName = parts[1].substring(1).trim();

      const setsText = parts[2];
      const repsText = parts[2];
      const weightText = parts[3];
      const durationText = parts[4];

      const sets = parseInt(setsText.match(/\d+/)?.[0] || "0", 10);
      const reps = parseInt(repsText.match(/reps\s*(\d+)/)?.[1] || "0", 10);
      const weight = parseFloat(weightText.match(/[\d.]+/)?.[0] || "0");
      const duration = parseFloat(durationText.match(/[\d.]+/)?.[0] || "0");

      const workout = {
        category,
        workoutName,
        sets,
        reps,
        weight,
        duration,
        caloriesBurned: calculateCaloriesBurnt({ duration, weight }),
      };

      await Workout.create({ ...workout, user: userId, date: new Date() });
      workouts.push(workout);
    }

    res.status(201).json({
      message: "Workouts added successfully",
      workouts,
    });
  } catch (err) {
    console.error("Add Workout Error:", err);
    next(createError(500, "Error adding workout"));
  }
};

// ✅ CALORIES CALCULATION
const calculateCaloriesBurnt = ({ duration, weight }) => {
  const minutes = parseFloat(duration);
  const kg = parseFloat(weight);
  const baseRate = 5;
  return Math.round(minutes * baseRate * (kg / 60));
};
