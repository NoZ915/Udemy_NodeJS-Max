const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use((req, res, next) => {
  User.findById("65a3562f7ab07fbe0099a42e")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

const errorController = require("./controllers/error");
app.use(errorController.get404);

mongoose.connect('mongodb+srv://noz915:noz915@cluster0.u80fykc.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "abc@gmail.com",
          cart: { items: [] }
        })
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });