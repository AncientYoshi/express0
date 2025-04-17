import express from "express";
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

// create a new post
router.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.title || !req.body.content) {
    console.log("Title and content are required.");
    return res.status(400).json({ message: "Title and content are required." });
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
router.put("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post)
    return res.status(404).json(`Post not found with id ${req.params.id}`);

  if (!req.body.title || !req.body.content) {
    console.log("Title and content are required.");
    return res.status(400).json({ message: "Title and content are required." });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json(post);
});

// delete a post
router.delete("/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1)
    return res.status(404).json(`Post not found with id ${req.params.id}`);

  posts.splice(postIndex, 1);
  res.status(204).json({ message: "Post deleted successfully." });
});

export default router;
