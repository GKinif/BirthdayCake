const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config/config');
const User   = require('../models/User'); // get our mongoose model
const userService = require('../services/userService');

// get an instance of the router
const userRoutes = express.Router();

// USER ROUTES -------------------

/**
 * GET all users
 * @query {number} limit
 * @query {string[]} sort ['previousyears']
 */
userRoutes.get('/user', function(req, res) {
    userService.getUsers()
        .then((users) => {
            // @TODO: handle case when no user are in DB
            const usersData = users.map(user => user.toObject());
            const response = {
                data: usersData,
                message: 'User list successfuly loaded',
                success: true,
            };
            res.json(response);
        })
        .catch((err) => {
            // @TODO: handle error properly
            const response = {
                data: err,
                message: 'An error occured',
                success: false,
            };
            res.status(500).json(response);
        });
});

// GET user based on userId
userRoutes.get('/user/:userId', function(req, res) {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            if (!user) {
                throw {name: 'InvalidId', message: 'User not found'};
            }
            const response = {
                data: user.toObject(),
                success: true,
                message: 'Successfuly retrieved user',
            };
            res.json(response);
        })
        .catch((err) => {
            if (err.name === 'InvalidId') {
                const fullRes = { success: false, message: err.message};
                res.status(404).json(fullRes);
                return;
            }
            const fullRes = { success: false, message: 'Internal server error' };
            res.status(500).json(fullRes);
        });
});

// GET user votes based on userId
userRoutes.get('/user/:userId/votes', function(req, res) {
    User.findOne({ _id: req.params.userId})
        .then(user => {
            if (!user) {
                throw {name: 'InvalidId', message: 'User not found'};
            }

            const response = {
                data: user.toObject().votes,
                success: true,
                message: 'Successfuly retrieved votes',
            };
            res.json(response);
        })
        .catch((err) => {
            if (err.name === 'InvalidId') {
                const fullRes = { success: false, message: err.message};
                res.status(404).json(fullRes);
                return;
            }
            const fullRes = { success: false, message: 'Internal server error' };
            res.status(500).json(fullRes);
        });
});

// POST add a vote to provided userId's user
userRoutes.post(
    '/user/:userId/votes',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
    User.findOne({ _id: req.params.userId})
        .then(user => {
            if (!user) {
                throw {name: 'InvalidId', message: 'User not found'};
            }
            return user;
        })
        .then(user => {
            const author = {
                userId: req.user._id.toString(),
                firstName: req.user.firstName,
                lastName: req.user.lastName,
            };

            const existingVote = user.votes.find(vote => vote.author.userId === author.userId);

            if (existingVote) {
                throw {name: 'ExistingVote', message: 'You already voted for this user'};
            }

            user.votes.push({ author });
            user.save();

            const response = {
                data: user.toObject(),
                message: 'Successfully saved Cake Up',
                success: true,
            };
            res.status(201).json(response);
        })
        .catch(err => {
            if (err.name === 'InvalidId') {
                const fullRes = { success: false, message: err.message };
                res.status(404).json(fullRes);
                return;
            }
            if (err.name === 'ExistingVote') {
                const fullRes = { success: false, message: err.message };
                res.status(404).json(fullRes);
                return;
            }
            const fullRes = { success: false, message: 'Internal server error' };
            res.status(500).json(fullRes);
        });
});

// GET upcoming birthday list
userRoutes.get('/birthdaylist', function(req, res) {
    userService.getBirthDayList()
        .then((users) => {
            const usersData = users.map(user => user.toObject());

            const response = {
                data: usersData,
                success: true,
                message: 'Successfuly retrieved birthday list',
            };

            res.json(response);
        })
        .catch((err) => {
            const fullRes = { success: false, message: 'Internal server error' };
            res.status(500).json(fullRes);
        });
});

module.exports = userRoutes;
