const express = require("express");

app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about/", (req, res) => {
  res.send("About");
});
