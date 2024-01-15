const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session)
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  res.render("auth/login", {
    pageTitle: "Your Orders",
    path: "/orders",
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  User.findById("65a3562f7ab07fbe0099a42e")
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
}