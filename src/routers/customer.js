const express = require('express')
const Customer = require('../models/Customer')
const Product = require('../models/Product')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        var newCustomer = new Customer(req.body)
        await newCustomer.save()
        res.status(201).send({newCustomer})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/addproduct', async (req, res) => {
    try {
        await Customer.findOne({firstname: req.body.firstname},(err, customer) => {
        customer.products.push({name:'newproductasdfadf', price: 5, quantity:5})
        customer.save()
        res.status(201).send({customer})
       })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router