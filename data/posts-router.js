const express = require("express");

const Posts = require("./db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    const postInfo = req.body;
    console.log("post Information", postInfo);

    if (!postInfo.title || !postInfo.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post && post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "The post has been deleted."
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postInfo = req.body;
    const id = req.params.id;
    const post = await Posts.update(id, postInfo);

    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else if (!postInfo.title || !postInfo.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

module.exports = router;
