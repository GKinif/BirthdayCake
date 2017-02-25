const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../models/User'); // get our mongoose model

// USER ROUTES -------------------
// get an instance of the router
const userRoutes = express.Router();

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
