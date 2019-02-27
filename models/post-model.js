const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    _id: { type: String },
    username_id: { usernameId: { type: Schema.Types.ObjectId }, ref: "User" },
    image: { type: String, required: true },
    caption: { type: String }, //  hashtags, @users
    likedBy: [{ liker: { type: Schema.Types.ObjectId }, ref: "User" }]
    // ##########
    // POSSIBLE ADDITIONAL
    // localisation: { type: String },
    // taggedAccounts: [{ taggedUser: { type: Schema.Types.ObjectId }, ref: "User" }]
    // replies
    // likes
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("User", postSchema);
module.exports = Post;

// // ###################################################
// // EXAMPLE
// // ###################################################

// {
//   _id: "45324mnwegrgekrjhtj3gt"
//   username_id: "5ksjhrklsjgkjerht",
//   image: "https://wertemntber.fr",
//   localisation: "Paris",
//   caption: "Nice weather, love the rooftop #sun @brwncluse @ewinski"
//   date: "Wed 3 2019",
//   taggedAccounts: ["username._id", ...]
//   likedBy: ["username_id", ...] = ["ewinski", "frietpoune",...]
// },
// {
//   timestamps: true
// }
// );
