const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
  { id: 4, title: "Post 4", content: "This is the content of post 4" },
];

// request all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

// request a single post
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post)
    return res.status(404).send(`Post not found with id ${req.params.id}`);
  res.status(200).json(post);
});

router.get("/:id/content", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.status(200).json(post.content);
});

module.exports = router;
