import jwt from "jsonwebtoken";
import { config } from "../configs/app.js";

export const validateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const parsedToken = token.replace("Bearer ", "");

    const payload = jwt.verify(parsedToken, config.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};