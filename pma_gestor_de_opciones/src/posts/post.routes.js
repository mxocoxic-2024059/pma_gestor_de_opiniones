import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "./post.controller.js";

import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

router.post("/", validateJWT, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", validateJWT, update);
router.delete("/:id", validateJWT, remove);

export default router;