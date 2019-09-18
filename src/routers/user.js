const express = require('express')
const User = require('../models/User')
const auth2 = require('../middleware/auth2')
const router = express.Router()

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});



// router.post('/', async (req, res) => {
//     // Create a new user
//     console.log("test")
//     try {
//         const user = new User(req.body)
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({ user, token })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
router.post('/register', async(req, res) => {
    const { name, password } = req.body
    User.createUser({ name, password}).then(user => 
        res.json({ user, msg: 'account created successfully'})
        )
})
router.post('/login', async(req, res) => {
    const { name, password } = req.body;
  if (name && password) {
    let user = await User.getUser({ name: name });
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_KEY,{expiresIn: '4h'});
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
})

router.get('/me', auth2, async(req, res) => {
    // View logged in user profile
    User.getAllUser().then(user => res.json(user));
})

router.post('/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router