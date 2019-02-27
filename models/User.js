const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    profile: { type: Object }, // username(unique), name, email, psw, bio, website, profile picture, phone number, sex, FB account, posts (view 1), posts (view 2)
    posts: { type: Array }, // image, localisation, tagged accounts, hashtags, caption, comments {account of commenter, content, likes, time, editable, reply}, likes{account of liker}, send as message
    followers: { type: Array },
    following: { type: Array },
    likedPosts: {},
    taggedPics: {}
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
