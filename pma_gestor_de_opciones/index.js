
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/auth/auth.routes.js";
import userRoutes from "./src/user/user.routes.js";
import fieldRoutes from "./src/fields/field.routes.js";
import { config } from "./configs/app.js";

dotenv.config();

const app = express();

app.use(express.json());
app.post("/test-body", (req, res) => {
  console.log("Test Body:", req.body);
  res.json({ receivedBody: req.body });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fields", fieldRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });