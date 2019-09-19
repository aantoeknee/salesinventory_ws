const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const sequelize = new Sequelize({
  database: 'mydb',
  username: 'root',
  password: '',
  dialect: 'mysql',
  operatorsAliases: false,
    logging: false,
    define: {
        timestamps: false
    }
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
  
  module.exports = sequelize