const path = require('path');
const db = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
  User.findById("658fa9ce14954e00073625c8")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

const errorController = require("./controllers/error");
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
})