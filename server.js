import express from "express";
import path from "path";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";

const app = express();
const port = process.env.PORT || 5000;

//set up static folder
// app.use(express.static(path.join(__dirname, "public")));

// Middleware to serve static files from the "public" directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use(logger);
app.use("/api/posts", posts);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
