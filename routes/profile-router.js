const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");

const router = express.Router();

// ########################################
// PROFILE PAGE TO GET THE USER PROFILE
// AND THE POSTS RELATED FOR THE GRID VIEW
// ########################################

router.get("/:username", (req, res, next) => {
  const { username } = req.params;
  console.log("Back end username sent", username); //OK got the username

  User.findOne({ username: { $eq: username } })
    .then(userDoc => {
      Post.find({ username_id: { $eq: userDoc._id } })
        .then(postResults => {
          userDoc.encryptedPassword = undefined;
          res.json({
            postResults: postResults,
            userDoc: userDoc
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
