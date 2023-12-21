const path = require('path');
const db = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

const errorController = require("./controllers/error");
app.use(errorController.get404);

app.listen(3001);
