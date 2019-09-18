const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.post('/', async (req, res) => {
    // Create new products
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).send({product})

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router