import User from "./user.model.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};

export const updateProfile = async (req, res) => {
  const updates = req.body;

  delete updates.password;
  delete updates.role;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true }
  ).select("-password");

  res.json(user);
};