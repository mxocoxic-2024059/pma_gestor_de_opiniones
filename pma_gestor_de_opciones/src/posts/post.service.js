import Post from "./post.model.js";

/* ================= CREATE ================= */
export const createPost = async (data, userId) => {
  const { title, category, text } = data;

  if (!title || !category || !text) {
    throw new Error("All fields are required");
  }

  const post = await Post.create({
    title,
    category,
    text,
    author: userId,
  });

  return post;
};

/* ================= GET ALL ================= */
export const getPosts = async () => {
  return await Post.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 });
};

/* ================= GET BY ID ================= */
export const getPostById = async (id) => {
  const post = await Post.findById(id).populate(
    "author",
    "username email"
  );

  if (!post) throw new Error("Post not found");

  return post;
};

/* ================= UPDATE ================= */
export const updatePost = async (id, data, userId) => {
  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (post.author.toString() !== userId) {
    throw new Error("You are not the author of this post");
  }

  const updatedPost = await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updatedPost;
};

/* ================= DELETE ================= */
export const deletePost = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) throw new Error("Post not found");

  if (post.author.toString() !== userId) {
    throw new Error("You are not the author of this post");
  }

  await Post.findByIdAndDelete(id);

  return { message: "Post deleted successfully" };
};