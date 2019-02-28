const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");

const router = express.Router();

router.post("/posts", (req, res, next) => {
  const currentUser = req.body;

  // console.log("Current User logged in is ", req.body);
  console.log("Current User logged in is ", currentUser);

  Post.find({ username_id: { $eq: currentUser._id } }).then(postResults =>
    res.json(postResults).catch(err => next(err))
  );
  // console.log("The posts from the current user is :", postResults);
});

router.get("/p/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("username_id")
    .then(postDoc => res.json(postDoc))
    .catch(err => next(err));
});

module.exports = router;
