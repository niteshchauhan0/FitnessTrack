import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import WorkoutRoutes from "./routes/Workout.js"; // ✅ Make sure filename is `Workout.js`

// === Load environment variables ===
dotenv.config();

// === Initialize Express app ===
const app = express();

// === Middleware ===
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// === API Routes ===
app.use("/api/user", UserRoutes); // Routes like /api/user/signup etc.
app.use("/api/user/workout", WorkoutRoutes); // ✅ Fixed path so it matches frontend

// === Health Check Route ===
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ Server is live and working!" });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  console.error("❌ Global Error:", err.stack || message);
  res.status(status).json({ success: false, status, message });
});

// === Connect to MongoDB and Start Server ===
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("❌ MONGO_URI is not defined in .env");
      process.exit(1);
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
