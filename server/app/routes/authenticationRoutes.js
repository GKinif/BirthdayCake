const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../models/User'); // get our mongoose model

// AUTHENTICATION ROUTES -------------------
// get an instance of the router for api routes
const authenticationRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
authenticationRoutes.post('/authenticate', function(req, res) {
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

module.exports = authenticationRoutes;
