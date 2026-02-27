import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "./post.service.js";

/* ================= CREATE ================= */
export const create = async (req, res) => {
  try {
    const post = await createPost(req.body, req.user.id);

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAll = async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const update = async (req, res) => {
  try {
    const post = await updatePost(
      req.params.id,
      req.body,
      req.user.id
    );

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const remove = async (req, res) => {
  try {
    const result = await deletePost(
      req.params.id,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};