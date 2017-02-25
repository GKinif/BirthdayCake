const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../app/models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.TOKEN_SECRET;

const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            // message can be found under req.authInfo.message
            done(null, false, {message: 'Unable to Authenticate token'});
        }
    });
});

module.exports = strategy;
