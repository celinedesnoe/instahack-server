require("dotenv").config();
const mongoose = require("mongoose");

const Comment = require("../models/comment-model.js");
const someComments = [
  {
    _id: { type: String },
    username_id: { usernameId: { type: Schema.Types.ObjectId }, ref: "User" },
    post_id: { postId: { type: Schema.Types.ObjectId }, ref: "Post" },
    content: "Me too I want to go to Sichuan and eat all food"
  }
];

mongoose
  .connect("mongodb://localhost/instahack-server", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Comment.insertMany(someComments)
  .then(commentResult => {
    console.log(`Inserted ${commentResult.length} comments`);
  })
  .catch(err => {
    console.log("COMMENT insert error", err);
  });
