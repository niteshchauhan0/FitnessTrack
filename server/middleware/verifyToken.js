import jwt from "jsonwebtoken";
import { createError } from "../error.js";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Unauthorized: No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // Ensure JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(createError(500, "JWT_SECRET is not defined in .env"));
    }

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Attach user payload to request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return next(createError(403, "Forbidden: Invalid or expired token"));
  }
};

export default verifyToken;
