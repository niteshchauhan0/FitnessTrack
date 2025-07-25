
// server/controllers/Workout.js

export const getAllWorkouts = (req, res) => {
    res.status(200).json({ message: "List of all workouts (dummy data)" });
  };
  
  export const createWorkout = (req, res) => {
    res.status(201).json({ message: "Workout created (dummy data)" });
  };
  