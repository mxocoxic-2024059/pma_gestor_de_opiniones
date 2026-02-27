import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "./comment.service.js";

/* CREATE */
export const create = async (req, res, next) => {
  try {
    const comment = await createComment(req.body, req.user.id);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

/* GET BY POST */
export const getByPost = async (req, res, next) => {
  try {
    const comments = await getCommentsByPost(req.params.postId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

/* UPDATE */
export const update = async (req, res, next) => {
  try {
    const comment = await updateComment(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

/* DELETE */
export const remove = async (req, res, next) => {
  try {
    const result = await deleteComment(
      req.params.id,
      req.user.id
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};