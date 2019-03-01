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

// #################################################
// PROCESS UN-FOLLOW
// #################################################

router.post("/process-unfollow", (req, res, next) => {
  const { profileUser, currentUser } = req.body;
  console.log("CurrentUser id", currentUser._id);
  console.log("ProfileUser id", profileUser._id);

  User.findByIdAndUpdate(currentUser._id, {
    $pull: { following: profileUser._id }
  })
    .then(userDoc => {
      // hide encrypted password before sending the JSON (it's a security risk)
      userDoc.encryptedPassword = undefined;
      res.json({ userDoc: userDoc });
      console.log("CurrentUser update following", userDoc.following);
    })
    .catch(err => next(err));
});

// #################################################
// PROCESS FOLLOW
// #################################################

router.post("/process-follow", (req, res, next) => {
  const { profileUser, currentUser } = req.body;
  console.log("CurrentUser id", currentUser._id);
  console.log("ProfileUser id", profileUser._id);

  User.findByIdAndUpdate(currentUser._id, {
    $push: { following: profileUser._id }
  })

    .then(userDoc => {
      // hide encrypted password before sending the JSON (it's a security risk)
      userDoc.encryptedPassword = undefined;
      res.json({ userDoc: userDoc });
      console.log("CurrentUser update following", userDoc.following);
    })
    .catch(err => next(err));
});

module.exports = router;
