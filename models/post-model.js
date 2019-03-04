const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    username_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String, required: true },
    caption: { type: String },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    // ##########
    // POSSIBLE ADDITIONAL
    // localisation: { type: String },
    // taggedAccounts: [{ type: mongoose.Schema.Types.ObjectId , ref: "User" }]
    // replies
    // likes
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
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
