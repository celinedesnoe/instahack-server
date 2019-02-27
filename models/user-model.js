const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String },
    username: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    bio: { type: String },
    website: { type: String },
    profilePic: { type: String, default: "https://" },
    phoneNumber: { type: Number, minlength: 10 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined", "Prefer not to say"]
    }
    // facebookAccount: { type: String },
    // following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // taggedPics: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

// ###################################################
// EXAMPLE
// ###################################################

// {
//   _id: "5fgw402834yhwegr3"
//   username: "frietpoune",
//   firstName: "Céline",
//   lastName: "Desnoë",
//   email: "frietpoune92@hotmail.fr",
//   encryptedPassword: "2342euwhn23jk4h2ej234",
//   bio: "Coding Hard",
//   website: "https://www.frietpoune.fr",
//   profilePic: "http://ermbkjhtnaeklrjthe.fr",
//   phoneNumber: 0698632152,
//   sex: female,
//   facebookAccount: "frietpoune92@hotmail.fr",
//   following: ["laurastromboni", "brwncluse", ... ],
//   followers: ["laurastromboni", "brwncluse", ... ],
//   // likedPosts: { type: Array },
//   taggedPics: ["post_.id 1", ...]
// }
