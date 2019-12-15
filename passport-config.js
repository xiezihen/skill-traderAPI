const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
require('dotenv/config');

const initialize = (passport) =>{
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new jwtStrategy(opts, (jwt_payload,done) =>{
        console.log(jwt_payload._doc);
        User.getUserById(jwt_payload._doc._id, (err, user)=> {
            if (err) {
                return done(err, false);
            }if (user) {
                return done(err, user);

            }else {
                return done(null, false);
            }
        });
    }));

}


module.exports = initialize