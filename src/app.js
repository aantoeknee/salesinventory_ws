const express = require('express')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const customerRouter = require('./routers/customer')
const serviceRouter = require('./routers/service')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv');
const connection = require('./db/sqldb');


dotenv.config({path: '../.env'});
console.log(process.env.JWT_KEY)
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
app.use(morgan('short'))
app.use(express.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use('/users',userRouter)
app.use('/products', productRouter)
app.use('/customers',  customerRouter)
app.use('/services', serviceRouter)