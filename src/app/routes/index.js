// const routes = require("express").Router();

// routes.get("/", (req, res) => {
//   res.send("Hello World");
// });

module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login", {
      message: req.flash("login_message"),
    });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", (req, res) => {
    res.render("signup", {
      message: req.flash("signup_message"),
    });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get("/profile", isLogged, (req, res) => {
    res.render("profile", {
      user: req.user,
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  }
};
