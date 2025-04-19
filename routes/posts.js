import express from "express";
const router = express.Router();
import {
  getPosts,
  getPostById,
  getPostContent,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

// request all posts
router.get("/", getPosts);

// request a single post
router.get("/:id", getPostById);

router.get("/:id/content", getPostContent);

// create a new post
router.post("/", createPost);

// update a post
router.put("/:id", updatePost);

// delete a post
router.delete("/:id", deletePost);

export default router;
