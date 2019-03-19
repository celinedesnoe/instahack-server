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
        .sort({ createdAt: -1 })
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
    })
    .catch(err => next(err));
});

// #################################################
// PROCESS UN-FOLLOW
// #################################################

router.post("/process-unfollow", (req, res, next) => {
  const profileUser = req.body;
  const currentUser = req.user;
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
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// #################################################
// PROCESS FOLLOW
// #################################################

router.post("/process-follow", (req, res, next) => {
  const profileUser = req.body;
  const currentUser = req.user;
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
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// ##################################################################################
// SEARCH BY USERNAME
// ##################################################################################

router.get("/explore/search", (req, res, next) => {
  User.find()
    .then(userResults => {
      res.json(userResults);
    })
    .catch(err => next(err));
});

module.exports = router;
