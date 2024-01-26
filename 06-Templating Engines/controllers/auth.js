const crypto = require("crypto"); //nodejs內建加解密的套件

const bcrypt = require("bcryptjs");
const User = require("../models/user");

const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');

const transporter = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: "0770e3d2-44ad-428b-b134-32a10b917365"
  }
}))

exports.getLogin = (req, res, next) => {
  console.log(req.session)
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Your Orders",
    path: "/orders",
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: message
  });
}

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "invalid email or password");
        // return res.redirect("/login");
        return req.session.save(err => {
          res.redirect('/login');
        });
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            })
          }
          req.flash("error", "invalid email or password");
          res.redirect("/login")
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "email exist already");
        return res.redirect("/signup")
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          })
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
          return transporter.sendMail({
            from: 'My Shop (NodeJS)<S10855021@stumail.nutn.edu.tw>',
            to: email,
            subject: 'Signup Success',
            text: 'Signup was successful.',
            html: '<h1>Congratulation</h1><p>Signing up was successful.</p>',
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
}

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    isAuthenticated: false,
    errorMessage: message
  });
}

exports.postReset = (req, res, nex) => {

}