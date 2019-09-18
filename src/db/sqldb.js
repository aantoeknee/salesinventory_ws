const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const sequelize = new Sequelize({
  database: 'testdb',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

  module.exports = sequelize