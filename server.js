const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

//set up static folder
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
  { id: 4, title: "Post 4", content: "This is the content of post 4" },
];

// request all posts
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

// request a single post
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.json(post);
});

app.get("/api/posts/:id/content", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.json(post.content);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
