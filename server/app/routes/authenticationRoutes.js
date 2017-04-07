const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../models/User'); // get our mongoose model

// AUTHENTICATION ROUTES -------------------
// get an instance of the router for api routes
const authenticationRoutes = express.Router();

authenticationRoutes.post('/authenticate', function(req, res) {
    if (!(req.body.email && req.body.password)) {
        res.status(400).json(
            { success: false, message: 'Missing information.' }
        );
        return;
    }
    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            res.status(500).json(
                { success: false, message: 'An error occured, please try again later.' }
            );
            return console.log(err);
        }

        if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed.' });
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

                        // return the information including token
                        res.json({
                            success: true,
                            message: 'Authentication complete',
                            data: {
                                token,
                                user,
                            },
                        });
                    } else {
                        // Wrong password
                        res.status(401).json(
                            { success: false, message: 'Authentication failed.' }
                        );
                    }
                })
                .catch((err) => {
                    console.log('Authentication error: ', err);
                    res.status(500).json(
                        { success: false, message: 'An error occured, please try again later.' }
                    );
                });
        }
    });
});

module.exports = authenticationRoutes;
