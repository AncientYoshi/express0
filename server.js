import express from "express";
import path from "path";
import posts from "./routes/posts.js";
const app = express();
const port = process.env.PORT || 5000;

//set up static folder
// app.use(express.static(path.join(__dirname, "public")));
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
