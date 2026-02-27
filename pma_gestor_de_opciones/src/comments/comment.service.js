import Comment from "./comment.model.js";
import Post from "../posts/post.model.js";

/* =============== CREATE COMMENT =============== */
export const createComment = async (data, userId) => {
  const { text, post } = data;

  if (!text || !post) {
    throw new Error("Text and post are required");
  }

  const postExists = await Post.findById(post);
  if (!postExists) {
    throw new Error("Post not found");
  }

  const comment = await Comment.create({
    text,
    author: userId,
    post,
  });

  return comment;
};

/* =============== GET BY POST =============== */
export const getCommentsByPost = async (postId) => {
  const comments = await Comment.find({ post: postId })
    .populate("author", "username email")
    .sort({ createdAt: -1 });

  return comments;
};

/* =============== UPDATE COMMENT =============== */
export const updateComment = async (id, data, userId) => {
  const comment = await Comment.findById(id);

  if (!comment) throw new Error("Comment not found");

  if (comment.author.toString() !== userId) {
    throw new Error("You are not the author of this comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );

  return updatedComment;
};

/* =============== DELETE COMMENT =============== */
export const deleteComment = async (id, userId) => {
  const comment = await Comment.findById(id);

  if (!comment) throw new Error("Comment not found");

  if (comment.author.toString() !== userId) {
    throw new Error("You are not the author of this comment");
  }

  await Comment.findByIdAndDelete(id);

  return { message: "Comment deleted successfully" };
};