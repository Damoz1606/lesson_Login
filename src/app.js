const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const app = express();

const { url } = require("./config/database");

//database
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./config/passport")(passport);

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(morgan("dev"));
app.use(cookie());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "helloworld",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require("./app/routes/index")(app, passport);
//app.use("/", routes);

//static files
app.use("/public", express.static(path.join(__dirname, "public")));

//listener
app.listen(app.get("port"), () => {
  console.log("Server on port: " + app.get("port"));
});
