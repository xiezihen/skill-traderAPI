const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
require('dotenv/config');

const initialize = (passport) =>{
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new jwtStrategy(opts, (jwt_payload,done) =>{
        User.findOne({id: jwt_payload.sub}, (err, user)=> {
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