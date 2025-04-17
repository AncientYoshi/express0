const express = require("express");
const path = require("path");
const posts = require("./routes/posts");

const app = express();
const port = process.env.PORT || 5000;

//set up static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
