const express = require('express')
const User = require('../models/User')
const Customer = require('../models/Customer')
const Service = require('../models/Service')
const auth2 = require('../middleware/auth2')
const router = express.Router()

//file uploads
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image.jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
})

router.post('/addservice', upload.single('serviceImage'),async(req, res) => {
    console.log(req.file)
    console.log("POST /addservice")
    const { serviceName, serviceCost } = req.body
    const imageUrl = req.file.path
    console.log(req.body)
    Service.addService({serviceName, serviceCost, imageUrl})
    .then(service => res.json({message: "success"}))
    .catch(err => res.sendStatus(200).res.json({message: err}))
})

router.get('/allservices', async(req, res) => {
    Service.getAllServices()
    .then(services => res.json(services))
})

router.post('/deleteservice/:id', async(req, res) => {
    Service.deleteService(req.params.id)
    .then(service => res.json({
        message: service + " row has been successfully deleted"
    }))
})

module.exports = router