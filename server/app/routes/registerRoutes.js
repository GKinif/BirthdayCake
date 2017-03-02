const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const shortid = require('shortid');

const config = require('../../config/config');
const Registration = require('../models/Registration');
const User = require('../models/User');
const userValidation = require('../../../shared/validation/userValidation');

const registerRoutes = express.Router();

// =======================
// Protected routes ======
// =======================
// All routes after this will need jwt authentication
// registerRoutes.use(passport.authenticate('jwt', { session: false }));

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
        creator: req.user._id,
    };

    const registrationInstance = new Registration(registration);
    registrationInstance.save();

    res.json({registration: registrationInstance.toObject()});
});

/**
 *
 */
registerRoutes.post('/register', function(req, res) {
    // @TODO: Validate user data first, then retrieve registration, then save user
    Registration.findOne({ registerId: req.body.registerId })
        .then(registration => {
            if (!registration || registration.isUsed) {
                throw {name: 'InvalidRegistration', message: 'Registration not found or already used'};
            }
            return registration;
        })
        .then(registration => {
            const userData = {
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: new Date(req.body.birthDate),
            };

            if (!userValidation.isUserValid(userData)) {
                throw { name: 'InvalidUserData', message: 'Invalid user data'};
            }
            const userInstance = new User(userData);

            // save the sample user
            return userInstance.save()
                .then((user) => {
                    registration.isUsed = true;
                    registration.save();
                    return user;
                });
        })
        .then(userPromise => {
            const fullRes = Object.assign(
                {},
                {
                    registration: userPromise.toObject(),
                    success: true,
                }
            );
            res.json(fullRes);
        })
        .catch((err) => {
            if (err.name === 'InvalidRegistration') {
                const fullRes = { success: false, message: err.message};
                res.status(404).json(fullRes);
                return;
            }
            if (err.name === 'MongoError') {
                const fullRes = { success: false, message: 'Email already used' };
                res.status(400).json(fullRes);
                return;
            }
            if (err.name === 'InvalidUserData') {
                const fullRes = { success: false, message: err.message };
                res.status(400).json(fullRes);
                return;
            }
            const fullRes = { success: false, message: 'Internal server error' };
            res.status(500).json(fullRes);
        });
});

module.exports = registerRoutes;
