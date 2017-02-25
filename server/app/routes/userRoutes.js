const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../models/user'); // get our mongoose model

// API ROUTES -------------------
// get an instance of the router for api routes
const userRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
userRoutes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            user.comparePassword(req.body.password)
                .then(isMatch => {
                    if (isMatch) {
                        // if user is found and password is right
                        // create a token
                        const token = jwt.sign(user.toObject(), process.env.TOKEN_SECRET, {
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Authentication complete',
                            token: token
                        });
                    } else {
                        res.json(
                            { success: false, message: 'Authentication failed. Wrong password.' }
                        );
                    }
                })
                .catch(err => console.log('Authentication error: ', err));
        }
    });
});

// =======================
// Protected routes ======
// =======================
// All routes after this will need jwt authentication
userRoutes.use(passport.authenticate('jwt', { session: false }));

// route to show a random message (GET http://localhost:8080/api/)
userRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
userRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

module.exports = userRoutes;
