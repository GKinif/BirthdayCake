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
// userRoutes.use(passport.authenticate('jwt', { session: false }));

// route to return all users (GET http://localhost:8080/api/users)
userRoutes.get('/user', function(req, res) {
    User.find({}, function(err, users) {
        const usersData = users.map(user => user.toObject());
        res.json(usersData);
    });
});

module.exports = userRoutes;
