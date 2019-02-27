require("dotenv").config();
const mongoose = require("mongoose");

const Comment = require("../models/comment-model.js");
const someComments = [
  {
    username_id: "5c76c98c12f1c7eb241e47ed", // copy/paste a username_id from your own database,
    post_id: "5c76cf13dddc6cec5b543403", // copy/paste a post ID from your own database,
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
