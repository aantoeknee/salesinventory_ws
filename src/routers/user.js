const express = require('express')
const User = require('../models/User')
const Customer = require('../models/Customer')
const auth2 = require('../middleware/auth2')
const router = express.Router()

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

require('../models/Service')
require('../models/Customer')
require('../models/Customer_Service')


router.post('/register', async(req, res) => {
  console.log(req.body.name)
    const { username, password } = req.body
    User.createUser({ username, password}).then(user => 
        res.json({ user, msg: 'account created successfully'})
        )
})
router.post('/login', async(req, res) => {
    const { username, password } = req.body

  if (username && password) {
    let user = await User.getUser({ username: username });
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_KEY);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
})

router.get('/me/:id', auth2, async(req, res) => {
    // View logged in user profile
    // User.getUser(req.body).then(user => res.json(user));
    // Customer.getOrders().then(orders => res.json(orders))
    Customer.getProducts(req.params.id).then(products =>  res.json(Object.values(products)))
})

module.exports = router