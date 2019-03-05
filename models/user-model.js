const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    bio: { type: String },
    website: { type: String },
    profilePic: {
      type: String,
      default:
        "https://scontent-frx5-1.cdninstagram.com/vp/973f5d72a5217d4b771ed4a941e6f138/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com"
    },
    phoneNumber: { type: Number, minlength: 10 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined", "Prefer not to say"]
    },
    // facebookAccount: { type: String },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }]
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
