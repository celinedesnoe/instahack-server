require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

// run code inside of passport-setup.js
require("./config/passport-setup.js");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// allow cross-origin resource-sharing -- CORS
// (allows access to the API from other domains/origins)
app.use(
  cors({
    // receive cookies from other domains/origins
    credentials: true,
    // only these domains/origins can access the API
    origin: ["http://localhost:3000", "www.blah.com"]
  })
);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    // session secret must be different for every app
    secret: process.env.SESSION_SECRET,
    // save session info inside MongoDB
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// activate some of the passport methods in our routes
app.use(passport.initialize());
// load the logged-in user's information once we are logged-in
app.use(passport.session());

// all routes in the phone router will start with "/api"
const auth = require("./routes/auth-router.js");
app.use("/api", auth);

const post = require("./routes/post-router.js");
app.use("/api", post);

const profile = require("./routes/profile-router.js");
app.use("/api", profile);

const file = require("./routes/file-router.js");
app.use("/api", file);

module.exports = app;
