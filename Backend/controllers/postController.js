import Post from "../models/Post.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

/**
 * CREATE POST
 */
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!caption && !req.file) {
      return res.status(400).json({
        message: "Post must have text or image",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "social_posts",
      });

      imageUrl = result.secure_url;

      // remove temp file
      fs.unlinkSync(req.file.path);
    }

    const post = await Post.create({
      user: req.userId, // from checkToken
      caption,
      image: imageUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL POSTS (FEED)
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name username") // 🔥 Auth fields
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * LIKE / UNLIKE POST
 */
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.userId;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      likes: post.likes,
      isLiked: !isLiked,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
