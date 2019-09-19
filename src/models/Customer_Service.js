const Sequelize = require('sequelize');
const sequelize = require('../db/sqldb')
const Customer = require('../models/Customer')
const Service = require('../models/Service')

require('../models/Service')
require('../models/Customer')


 Customer_Service= sequelize.define('customer_service', {
    date: {
        type: Sequelize.DATE
    },
    cose: {
        type: Sequelize.DOUBLE
    }
  });

  Customer.belongsToMany(Service.model, {through: Customer_Service})
  Service.model.belongsToMany(Customer, {through: Customer_Service})

  Customer_Service.sync()