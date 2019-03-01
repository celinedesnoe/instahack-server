const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");

const router = express.Router();

// ########################################
// PROFILE PAGE TO GET THE USER PROFILE
// AND THE POSTS RELATED FOR THE GRID VIEW
// ########################################

router.get("/:username", (req, res, next) => {
  const { username } = req.params; //retrieve username

  User.findOne({ username: { $eq: username } })
    .then(userDoc => {
      // from userDoc get the posts with userDoc._id
      Post.find({ username_id: { $eq: userDoc._id } })
        .then(postResults => {
          // for security reason, never send password to the front
          userDoc.encryptedPassword = undefined;

          // send userDoc and postResults in the json file
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
