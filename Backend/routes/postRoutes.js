import { Router } from "express";
import { createPost, getAllPosts, toggleLike } from "../controllers/postController.js";
import { checkToken } from "../middleware/checkToken.js";
import upload from "../middleware/upload.js";

// 🔥 REGISTER MODELS (VERY IMPORTANT)
import "../models/Post.js";

const postRoutes = Router();

// CREATE POST
postRoutes.post(
  "/create",
  checkToken,
  upload.single("image"),
  createPost
);

// GET FEED
postRoutes.get(
  "/all",
  checkToken,
  getAllPosts
);

// LIKE / UNLIKE
postRoutes.put(
  "/like/:postId",
  checkToken,
  toggleLike
);

export default postRoutes;
