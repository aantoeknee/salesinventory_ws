const Sequelize = require('sequelize');
const sequelize = require('../db/sqldb')

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  })

  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('User table creation failed'))

 // create some helper functions to work on the database
const createUser = async({name, password}) => {
    return await User.create({
        name,
        password
    })
}

const getAllUser = async() => {
    return await User.findAll()
}

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    })
}


module.exports.createUser = createUser
module.exports.getAllUser = getAllUser
module.exports.getUser = getUser