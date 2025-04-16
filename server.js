const express = require("express");
const path = require("path");

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//set up static folder
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "Post 1", content: "This is the content of post 1" },
  { id: 2, title: "Post 2", content: "This is the content of post 2" },
  { id: 3, title: "Post 3", content: "This is the content of post 3" },
  { id: 4, title: "Post 4", content: "This is the content of post 4" },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});
