const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5
    },
    price: {
        type: Number,
        required:true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('products', productSchema)
module.exports.schema = productSchema
