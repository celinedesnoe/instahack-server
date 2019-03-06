const express = require("express");
const User = require("../models/user-model.js");
const Post = require("../models/post-model.js");
const Comment = require("../models/comment-model.js");

const router = express.Router();

// ##################################################################################
// GET DETAILS OF THE POST (LIKES, COMMENTS, PICTURE, USER, DATE POSTED)
// WITH THE USER OBJECT THROUGH POPULATE ("username_id") in the field "username_id"
// ##################################################################################

router.get("/p/:postId", (req, res, next) => {
  const { postId } = req.params;
  // return res.send(currentUser);
  Post.findById(postId)
    .populate("username_id", "profilePic username")
    .populate("likedBy", "profilePic followers")
    .then(postDoc => {
      Comment.find({ post_id: { $eq: postId } })
        .sort({ createdAt: 1 })
        .populate("username_id", "username")
        .then(commentResults => {
          res.json({ post: postDoc, comments: commentResults });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// router.get("/p/:postId", (req, res, next) => {
//   const { postId } = req.params;
//   // return res.send(currentUser);
//   Post.findById(postId)
//     .populate("username_id")
//     .then(postDoc => {
//       Comment.find({ post_id: { $eq: postId } })
//         .sort({ createdAt: -1 })
//         .populate("username_id")
//         .then(commentResults => {
//           res.json({ post: postDoc, comments: commentResults });
//         })
//         .catch(err => next(err));
//     })
//     .catch(err => next(err));
// });

// ##################################################################################
// ADD COMMENT (NEW COLLECTION -- TAKES COMMENTER, POST, AND COMMENT CONTENT)
// ##################################################################################

router.post("/process-comment", (req, res, next) => {
  const { username_id, post_id, content } = req.body;

  Comment.create({ username_id, post_id, content })
    .then(commentDoc => {
      Comment.findById(commentDoc._id)
        .populate("username_id")
        .then(newComment => res.json(newComment))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// ##################################################################################
// ADD A LIKE TO THE POST'S LIKEDBY ARRAY
// ##################################################################################

router.post("/process-like", (req, res, next) => {
  const { post, liker } = req.body;

  // return res.send(post);
  // return res.send(liker);

  console.log("LIKE: REQBODY in BACK: ", req.body);

  Post.findByIdAndUpdate(post, { $push: { likedBy: liker } }, { new: true })
    .then(postDoc => {
      console.log("LIKE: POSTDOC in BACK: ", postDoc);
      res.json(postDoc);
    })
    .catch(err => next(err));
});

// ##################################################################################
// REMOVE A LIKE FROM A POST'S LIKEDBY ARRAY
// ##################################################################################

router.post("/process-unlike", (req, res, next) => {
  const { post, unliker } = req.body;

  console.log("UNLIKE: REQBODY in BACK: ", req.body);

  // return res.send(post);
  // return res.send(liker);

  Post.findByIdAndUpdate(post, { $pull: { likedBy: unliker } }, { new: true })
    .then(postDoc => {
      console.log("LIKE: POSTDOC in BACK: ", postDoc);
      res.json(postDoc);
    })
    .catch(err => next(err));
});

// ##################################################################################
// RENDER ALL POSTS IN NEWSFEED
// ##################################################################################

router.post("/process-newsfeed", (req, res, next) => {
  console.log("BEGINNING OF PROCESS NEWSFEED");

  // get following from currentUser (sent in req.body)
  const { following } = req.body;

  // return console.log(following);

  // find all Posts for each user in the following array
  // populate the profilePic & username (will be used in post)
  // populate the profilePic & followers for all people who like (to be shown in the LikeList component)
  Post.find({ username_id: { $in: following } })
    .sort({ createdAt: -1 })
    .then(postDocs => {
      // ***********************************
      // this returns an array that contains all Posts from all users the currentUser is Following
      // ***********************************

      // return console.log("THIS IS POSTDOC: ", postDoc.length);
      // return console.log("THIS IS POSTDOC: ", postDoc[0]);
      // return console.log("THIS IS POSTDOCS: ", postDocs);

      // ***********************************
      // create an array with all post IDs to serve as a reference for the next Comment query
      // ***********************************
      const postIds = [];
      postDocs.forEach(onePost => {
        postIds.push(onePost._id);
      });
      res.json(postIds);
      // return console.log("POST IDS: ", postIds);

      //     // ***********************************
      //     // find the Comments for each of the post objects
      //     // ***********************************
      //     Comment.find({ post_id: { $in: postIds } })
      //       .limit(10)
      //       .skip(40)
      //       .sort({ createdAt: 1 })
      //       .populate({ path: "username_id", model: "User" })
      //       .then(allPostComments => {
      //         // ***********************************
      //         // returns an array with all Comment objects associated
      //         //    with all Post objects from all Users in Following
      //         // ***********************************
      //         // return console.log("THIS IS ALLPOSTCOMMENTS: ", allPostComments);

      //         // ***********************************
      //         // initialize empty array to which all posts + comments will be pushed
      //         // ***********************************
      //         let newsfeedPosts = [];

      //         // ***********************************
      //         // group all comments from onePost
      //         // ***********************************
      //         postDocs.forEach(onePost => {
      //           // ***********************************
      //           // initialize empty array to which all comments for one post will be pushed
      //           // ***********************************
      //           let onePostComments = [];
      //           allPostComments.forEach(oneComment => {
      //             console.log("POSTID in POST: ", onePost._id);
      //             console.log("POSTID in COMMENT: ", oneComment.post_id);
      //             if (onePost._id.equals(oneComment.post_id)) {
      //               // return console.log("ONE POST COMMENTS: ", onePostComments);
      //               return console.log("MATCH");
      //               onePostComments.push(oneComment);
      //             }
      //             // return console.log("ONE POST COMMENTS: ", onePostComments);

      //             // ***********************************
      //             // push onePostComments and onePost to newsfeedPosts in the format taken by PostDetailPage
      //             // ***********************************
      //             // return console.log("NEWSFEED POSTS: ", newsfeedPosts);
      //             // newsfeedPosts.push({ whatever });
      //           });
      //           // return console.log("ONE POST COMMENTS: ", onePostComments);
      //         });
      //       })
      //       .catch(err => next(err));

      //     postDocs.forEach(onePost => {
      //       // Comment.find({ post_id: { $in: postIds } })
      //       //   .sort({ createdAt: 1 })
      //       //   .populate("username_id", "username")
      //       //   .then(onePostComments => {
      //       //     // return console.log("THIS IS COMMENTRESULTS: ", onePostComments);
      //       //     // return console.log("THIS IS ONEPOST WITH COMMENTS: ", {
      //       //     //   post: onePost,
      //       //     //   comments: onePostComments
      //       //     // });
      //       //     // ***********************************
      //       //     // if (!res.finished) {
      //       //     //   res.json({ post: onePost, comments: onePostComments });
      //       //     // }
      //       //     // *********************************
      //       //     // postsWithComments.push({
      //       //     //   post: onePost,
      //       //     //   comments: onePostComments
      //       //     // });
      //       //     // ***********************************
      //       //     res.json({ post: onePost, comments: onePostComments });
      //       //     next();
      //       //   })
      //       //   .catch(err => next(err));
      //     });
      //     // return console.log("ARRAY WITH POSTS IN BACK END: ", postsWithComments);
    });
  //   .catch(err => next(err));
  // // return console.log("ARRAY WITH POSTS IN BACK END: ", postsWithComments);
});

module.exports = router;
