const express = require("express");
const cors = require("cors");

const postsRouter = require("./data/posts-router.js");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h2>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

app.use("/api/posts", postsRouter);

module.exports = app;
