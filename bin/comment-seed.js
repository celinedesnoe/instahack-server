require("dotenv").config();
const mongoose = require("mongoose");

const Comment = require("../models/comment-model.js");
const someComments = [
  {
<<<<<<< HEAD
    // frietpoune
    // Dan dan mian post
    username_id: "5c76d8f05024c01e778f8477",
    post_id: "5c76d9b3ebbe031eb371f632",
=======
    username_id: "5c76c98c12f1c7eb241e47ed", // copy/paste a username_id from your own database,
    post_id: "5c76cf13dddc6cec5b543403", // copy/paste a post ID from your own database,
>>>>>>> 3231c796c20ab81b476be7bb59bcc316f57bc69c
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
