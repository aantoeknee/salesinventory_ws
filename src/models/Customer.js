const Sequelize = require('sequelize');
const sequelize = require('../db/sqldb')

const Customer = sequelize.define('customer', {
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    mobile: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    gender : {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.STRING
    }
  },)
  
  Customer.sync()
  .then(() => console.log('Customer table created successfully'))
  .catch(err => console.log(err))

//   const Product = sequelize.define('product', {
//     productname: {
//         type: Sequelize.STRING,
//     },
//     price: {
//         type: Sequelize.DOUBLE,
//     }
//   })

//   Product.sync()
//   .then(() => console.log('Product table created successfully'))
//   .catch(err => console.log('Product table creation failed'))


//   Order = sequelize.define('order', {
//     date: Sequelize.DATE
//   });

//   Customer.belongsToMany(Product, {through: Order})
//   Product.belongsToMany(Customer, {through: Order})

//   Order.sync()

//   const getOrders = async() => {
//       return await Order.findAll()
//   }

//   const getProducts = async(id) => {
//       return await Product.findAll({
//         include: [{
//           model: Customer,
//           where: {id: id}
//          }]
//   })
// }

//   module.exports.getOrders = getOrders
//   module.exports.getProducts = getProducts

  module.exports = Customer

  
 