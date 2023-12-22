const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'noz915', {
  dialect: 'mysql',
  host: 'localhost',
  password: 'noz915'
});

module.exports = sequelize;