import express from "express";
import path from "path";
import posts from "./routes/posts.js";
const app = express();
const port = process.env.PORT || 5000;

//set up static folder
// app.use(express.static(path.join(__dirname, "public")));

// Middleware to serve static files from the "public" directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
