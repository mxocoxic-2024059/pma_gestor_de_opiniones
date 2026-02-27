import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { config } from "../../configs/app.js";

export const registerUser = async (data) => {
  const { username, email, password } = data;

  const userExists = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  return user;
};

export const loginUser = async (identifier, password) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  });

  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES }
  );

  return { user, token };
};