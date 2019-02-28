const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username_id: { type: Schema.Types.ObjectId, ref: "User" },
    post_id: { type: Schema.Types.ObjectId, ref: "Post" },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

// // ###################################################
// // EXAMPLE
// // ###################################################

// {
//   _id: "4343dgkdjfhgkjreht"
//   username_id: "5326o48234mnvs"
//   post_id: "5dkjftheriuhtjkehgr"
//   comment: "You are so lucky",
//   date: "wed 4 Jun"
// },
