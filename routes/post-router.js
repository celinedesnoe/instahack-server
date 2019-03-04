const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");
const Comment = require("../models/comment-model.js");

const router = express.Router();

// ##################################################################################
// GET DETAILS OF THE POST
// WITH THE USER OBJECT THROUGH POPULATE ("username_id") in the field "username_id"
// ##################################################################################

router.get("/p/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("username_id")
    .then(postDoc => {
      Comment.find({ post_id: { $eq: postId } })
        .then(commentDoc => res.json({ post: postDoc, comments: commentDoc }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
