const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");

const router = express.Router();

router.get("/p/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("username_id")
    .then(postDoc => res.json(postDoc))
    .catch(err => next(err));
});

module.exports = router;
