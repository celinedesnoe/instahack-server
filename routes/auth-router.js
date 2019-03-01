const express = require("express");
const User = require("../models/user-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");

// ************************
//          SIGNUP
// ************************

router.post("/process-signup", (req, res, next) => {
  const {
    fullName,
    username,
    email,
    originalPassword,
    bio,
    website,
    profilePic,
    phoneNumber,
    gender,
    following,
    followers,
    taggedPics
  } = req.body;
  // return console.log(fullName, username, email, originalPassword);

  // enforce password rules (can't be empty and MUST have a digit)
  if (!originalPassword || !originalPassword.match(/[0-9]/)) {
    next(new Error("Password can't be blank and must contain a number."));
    return;
  }

  // return res.send(JSON.stringify(originalPassword));

  // encrypt the user's password before saving it
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  // return res.send(JSON.stringify(encryptedPassword));

  User.create({
    fullName,
    username,
    email,
    bio,
    website,
    profilePic,
    phoneNumber,
    gender,
    following,
    followers,
    taggedPics,
    encryptedPassword
  })
    .then(userDoc => {
      req.logIn(userDoc, () => {
        // hide encrypted password before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
  // return res.send("so far so food");
});

// ************************
//          LOGIN
// ************************

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  console.log("Req.body from Log In", req.body);
  // return res.send("so far so good");

  // validate the email by searching the database for an account with that email
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      // User.findOne() will give us NULL in userDoc if it found nothing
      if (!userDoc) {
        // req.flash() sends a feedback message before a redirect
        // (it's defined by the "connect-flash" npm package)
        next(new Error("Email is incorrect."));

        return;
      }

      const { encryptedPassword } = userDoc;

      // validate the password by using bcrypt.compareSync()
      // (bcrypt.compareSync() will return FALSE if the passwords don't match)
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        // req.flash() sends a feedback message before a redirect
        // (it's defined by the "connect-flash" npm package)
        next(new Error("Password is incorrect"));
        return;
      }

      // email & password are CORRECT!
      // if we MANUALLY managed the user session
      // req.session.userId = userDoc._id;

      // instead we'll use PASSPORT – an npm package for managing user sessions
      // req.logIn() is a Passport method that calls serializeUser()
      // (that saves the USER ID in the session which means we are logged-in)
      req.logIn(userDoc, () => {
        // hide encrypted password before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
});

// ************************
//          LOGOUT
// ************************

router.get("/logout", (req, res, next) => {
  // req.logOut() is a Passport method that removes the USER ID from the session
  req.logOut();

  // send some JSON to the client
  res.json({ message: "You are logged out!" });
});

// ************************
//          EDIT
// ************************

router.post("/process-edit", (req, res, next) => {
  const {
    fullName,
    username,
    email,
    bio,
    website,
    profilePic,
    phoneNumber,
    gender
  } = req.body.newInfo;

  const { _id } = req.body.oldInfo;

  User.findByIdAndUpdate(_id, {
    fullName: fullName,
    username: username,
    email: email,
    bio: bio,
    website: website,
    profilePic: profilePic,
    phoneNumber: phoneNumber,
    gender: gender
  })
    .then(userDoc => {
      // hide encrypted password before sending the JSON (it's a security risk)
      userDoc.encryptedPassword = undefined;
      res.json(userDoc);
    })
    .catch(err => next(err));
});

module.exports = router;
