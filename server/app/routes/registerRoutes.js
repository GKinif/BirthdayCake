const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const shortid = require('shortid');

const config = require('../../config/config');
const Registration = require('../models/Registration');

const registerRoutes = express.Router();

// =======================
// Protected routes ======
// =======================
// All routes after this will need jwt authentication
registerRoutes.use(passport.authenticate('jwt', { session: false }));

/**
 * Generate a registerId and send back a register link
 * Save a RegisterId document in DB
 */
registerRoutes.get('/register', function(req, res) {
    const registerId = shortid.generate();
    const registerLink = `${req.hostname}:${config.port}${req.originalUrl}/${registerId}`;
    const registration = {
        registerId,
        link: registerLink,
        author: {
            userId: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        },
    };
    const registrationInstance = new Registration(registration);
    registrationInstance.save();
    res.json({registration: registrationInstance.toObject()});
});

/**
 *
 */
registerRoutes.post('/register', function(req, res) {
    res.json({body: req.body});
});

module.exports = registerRoutes;
