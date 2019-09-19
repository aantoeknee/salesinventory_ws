const express = require('express')
const User = require('../models/User')
const Customer = require('../models/Customer')
const Service = require('../models/Service')
const auth2 = require('../middleware/auth2')
const router = express.Router()

router.post('/addservice', auth2, async(req, res) => {
    console.log("POST /addservice")
    const { serviceName, serviceCost } = req.body
    console.log(req.body)
    Service.addService({serviceName, serviceCost})
    .then(service => res.json({service, msg: 'Service Added'}))
    .catch(err => res.status(500).send(err))

})

router.get('/allservices', auth2, async(req, res) => {
    Service.getAllServices()
    .then(services => res.json(services))
    .catch(err => res.status(500).send(err))

})

router.post('/deleteservice/:id', auth2, async(req, res) => {
    Service.deleteService(req.params.id)
    .then(service => res.json({
        message: service + " row has been successfully deleted"
    }))
})

module.exports = router