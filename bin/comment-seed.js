require("dotenv").config();
const mongoose = require("mongoose");

const Comment = require("../models/comment-model.js");
const someComments = [
  {
    // frietpoune
    // Dan dan mian post
    username_id: "5c76d8f05024c01e778f8477",
    post_id: "5c76d9b3ebbe031eb371f632",
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
