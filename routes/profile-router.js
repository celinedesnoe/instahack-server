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

router.get("/:username/followers", (req, res, next) => {
  const { username } = req.params; //retrieve username
  User.findOne({ username: { $eq: username } })
    .populate("followers")
    .populate("following")
    .then(userDoc => {
      // from userDoc get the posts with userDoc._id
      userDoc.encryptedPassword = undefined;
      // send userDoc and postResults in the json file
      res.json({
        userDoc: userDoc
      });
      console.log(userDoc);
    })
    .catch(err => next(err));
});

// #################################################
// PROCESS UN-FOLLOW
// #################################################

router.post("/process-unfollow", (req, res, next) => {
  const { profileUser, currentUser } = req.body;

  User.findByIdAndUpdate(
    currentUser._id,
    {
      $pull: { following: profileUser._id }
    },
    { new: true }
  )
    .then(currentUserDoc => {
      User.findByIdAndUpdate(
        profileUser._id,
        {
          $pull: { followers: currentUser._id }
        },
        { new: true }
      )
        .then(profileUserDoc => {
          // hide encrypted password before sending the JSON (it's a security risk)
          profileUserDoc.encryptedPassword = undefined;
          currentUserDoc.encryptedPassword = undefined;
          res.json({
            currentUserDoc: currentUserDoc,
            profileUserDoc: profileUserDoc
          });
          console.log(
            "Current User following",
            currentUserDoc.following,
            "Profile User follower",
            profileUserDoc.followers
          );
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
  // console.log("CurrentUser id", currentUser._id);
  // console.log("CurrentUser following", currentUser.following);
  // console.log("ProfileUser id", profileUser._id);
  // console.log("ProfileUser followers", profileUser.follower);
});

// #################################################
// PROCESS FOLLOW
// #################################################

router.post("/process-follow", (req, res, next) => {
  const { profileUser, currentUser } = req.body;

  User.findByIdAndUpdate(
    currentUser._id,
    {
      $push: { following: profileUser._id }
    },
    { new: true }
  )
    .then(currentUserDoc => {
      User.findByIdAndUpdate(
        profileUser._id,
        {
          $push: { followers: currentUser._id }
        },
        { new: true }
      )
        .then(profileUserDoc => {
          // hide encrypted password before sending the JSON (it's a security risk)
          profileUserDoc.encryptedPassword = undefined;
          currentUserDoc.encryptedPassword = undefined;
          res.json({
            currentUserDoc: currentUserDoc,
            profileUserDoc: profileUserDoc
          });
          console.log(
            "Current User following",
            currentUserDoc.following,
            "Profile User follower",
            profileUserDoc.followers
          );
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

  // console.log("CurrentUser id", currentUser._id);
  // console.log("CurrentUser following", currentUser.following);
  // console.log("ProfileUser id", profileUser._id);
  // console.log("ProfileUser followers", profileUser.follower);
});

module.exports = router;
