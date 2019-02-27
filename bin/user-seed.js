require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/user-model.js");
const someUsers = [
  {
    username: "Nizaroni",
    name: "Nizar Khalife Iglesis",
    email: "nizar@pizza.com",
    encryptedPassword: "pizzalove123",
    bio: "Love pizza",
    website: "",
    profilePic:
      "https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg",
    phoneNumber: null,
    gender: "Male",
    // facebookAccount: { type: String },
    following: [],
    followers: [],
    taggedPics: []
  },

  {
    username: "ewnski",
    name: "Estelle Olawinski",
    email: "estelle@olawinski.com",
    encryptedPassword: "mojomojo999",
    bio: "Mojo forever",
    website: "",
    profilePic:
      "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Jack-Russell-Terrier-2.jpg",
    phoneNumber: null,
    gender: "Female",
    // facebookAccount: { type: String },
    following: [],
    followers: [],
    taggedPics: []
  },

  {
    username: "brwncluse",
    name: "Anoop Deep",
    email: "anoop@deep.com",
    encryptedPassword: "123ohio",
    bio: "Mojo forever",
    website: "",
    profilePic: "http://clipart-library.com/img1/1223835.jpg",
    phoneNumber: null,
    gender: "Prefer not to say",
    // facebookAccount: { type: String },
    following: [],
    followers: [],
    taggedPics: []
  },

  {
    username: "frietpoune",
    name: "Céline Desnoë",
    email: "celine@desnoe.com",
    encryptedPassword: "000rice",
    bio: "Rice is my favorite",
    website: "",
    profilePic:
      "https://i.kinja-img.com/gawker-media/image/upload/s--5nVw4IQ9--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/axvyospzf9kaso7542mi.jpg",
    phoneNumber: null,
    gender: "Female",
    // facebookAccount: { type: String },
    following: [],
    followers: [],
    taggedPics: []
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

User.insertMany(someUsers)
  .then(userResult => {
    console.log(`Inserted ${userResult.length} users`);
  })
  .catch(err => {
    console.log("USER insert error", err);
  });
