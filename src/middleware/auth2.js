const passport = require('passport');
const passportJWT = require('passport-jwt');
const dotenv = require('dotenv');
const User = require('../models/User')

dotenv.config({path: '../.env'});

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = User.getUser({ id: jwt_payload.id });
  
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy)

  const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        const err = {};
        err.status = 401;
        err.code = 'CP_SI_ValidationFailed';
        err.message = 'User is not authorized'
  
        return res.status(401).send(err); // send the error response to client
      }
      return next(); // continue to next middleware if no error.
  
    })(req, res, next); /* passport.authentication returns a function,
                           we invoke it with normal req..res arguments 
                           to override default functionality */ 
  }
 
 

  module.exports = auth