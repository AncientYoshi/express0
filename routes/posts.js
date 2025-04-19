import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
  { id: 4, title: "Post 4", content: "This is the content of post 4" },
];

// request all posts
router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

// request a single post
router.get("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }
  //
  res.status(200).json(post);
  //
});

router.get("/:id/content", (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post.content);
});

// create a new post
router.post("/", (req, res, next) => {
  console.log(req.body);
  if (!req.body.title || !req.body.content) {
    const error = new Error("Title and content are required.");
    error.status = 400;
    return next(error);
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// update a post
router.put("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }

  if (!req.body.title || !req.body.content) {
    const error = new Error("Title and content are required.");
    error.status = 400;
    return next(error);
  }
  if (req.body.title.length < 5) {
    const error = new Error("Title must be at least 5 characters long.");
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json(post);
});

// delete a post
router.delete("/:id", (req, res, next) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    const error = new Error(`Post not found with id ${req.params.id}`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);
  res.status(204).json({ message: "Post deleted successfully." });
});

export default router;
