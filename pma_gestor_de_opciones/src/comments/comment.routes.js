import { Router } from "express";
import {
  create,
  getByPost,
  update,
  remove,
} from "./comment.controller.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

router.post("/", validateJWT, create);
router.get("/post/:postId", getByPost);
router.put("/:id", validateJWT, update);
router.delete("/:id", validateJWT, remove);

export default router;