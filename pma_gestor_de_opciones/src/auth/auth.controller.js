import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
console.log("BODY:", req.body);
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const { user, token } = await loginUser(identifier, password);

    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};