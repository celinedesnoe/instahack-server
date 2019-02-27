const passport = require("passport");

const User = require("../models/user-model.js");

// serializeUser: defines what data to save in the session
// (this happens when you log in successfully)
passport.serializeUser((userDoc, done) => {
  // userDoc is the result of our log in function
  // call done() to give Passport the result

  // null as the first argument means NO ERRORS OCCURRED
  // user's ID as the second argument is the RESULT we send Passport
  done(null, userDoc._id);
});

// deserializeUser: defines how to retrieve the user information from the DB
// (happens automatically on EVERY request once you are LOGGED-IN)
passport.deserializeUser((userId, done) => {
  // userId is the result of serializeUser
  // call done() to give Passport the result

  User.findById(userId)
    .then(userDoc => {
      // null as the first argument means NO ERRORS OCCURRED
      // DB document as the second argument is the RESULT we send Passport
      done(null, userDoc);
    })
    // err as the first argument means we tell Passport there was an error
    .catch(err => done(err));
});
