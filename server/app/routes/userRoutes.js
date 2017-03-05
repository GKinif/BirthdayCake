const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../models/User'); // get our mongoose model

// get an instance of the router
const userRoutes = express.Router();

// USER ROUTES -------------------

// GET all users
userRoutes.get('/user', function(req, res) {
    User.find({}, function(err, users) {
        const usersData = users.map(user => user.toObject());
        res.json(usersData);
    });
});

// GET user based on userId
userRoutes.get('/user/:userId', function(req, res) {
    User.findOne({ _id: req.params.userId}, function(err, user) {
        const userData = user.toObject();
        res.json(userData);
    });
});

// GET user based on userId
userRoutes.get('/user/:userId/votes', function(req, res) {
    User.findOne({ _id: req.params.userId}, function(err, user) {
        const userVotes = user.toObject().votes;
        res.json(userVotes);
    });
});

// GET user based on userId
userRoutes.post(
    '/user/:userId/votes',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
    User.findOne({ _id: req.params.userId}, function(err, user) {
        const author = {
            userId: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        };
        // @TODO: verify if author already add a vote before pushing the vote
        user.votes.push({ author });
        user.save();
        res.json(user);
    });
});

module.exports = userRoutes;
