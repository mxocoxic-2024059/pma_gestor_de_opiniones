import { Router } from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

router.get("/profile", validateJWT, getProfile);
router.put("/profile", validateJWT, updateProfile);

export default router;