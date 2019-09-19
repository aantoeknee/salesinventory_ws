const Sequelize = require('sequelize');
const sequelize = require('../db/sqldb')

const Service = sequelize.define('service', {
    serviceName : {
        type: Sequelize.STRING,
        unique: true
    },
    serviceCost: {
        type: Sequelize.STRING
    }
  },)
  
  Service.sync()
  .then(() => console.log('Service table created successfully'))
  .catch(err => console.log(err))

  const getAllServices = async() => {
      return await Service.findAll()
  }
  const addService = async({serviceName, serviceCost}) => {
    return await Service.create({
        serviceName,
        serviceCost
    })
}
const deleteService = async(id) => {
    return await Service.destroy({
        where: {id: id}
    })
}

  module.exports.model = Service
  module.exports.addService = addService
  module.exports.getAllServices = getAllServices
  module.exports.deleteService = deleteService