const Sequelize = require('sequelize');
const sequelize = require('../db/sqldb')

const User = sequelize.define('user', {
    username: {
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
const createUser = async({username, password}) => {
    return await User.create({
        username,
        password
    })
}

const getAllUser = async() => {
    return await User.findAll()
}

const getUser = async(obj) => {
  console.log("ni agi dri")
    return await User.findOne({
        where: obj,
    })
}


module.exports.createUser = createUser
module.exports.getAllUser = getAllUser
module.exports.getUser = getUser