const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = require ('./Product')


const customerSchema = Schema({
    firstname: String,
    lastname: String,
    products: [productSchema.schema]
}, {
    versionKey: false
})

module.exports = mongoose.model('customers', customerSchema)