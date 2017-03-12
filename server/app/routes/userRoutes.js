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
    // const possibleSort = {
    //     nextbirthbay: 'nextBirthDay',
    // };
    // const currentYear = new Date().getFullYear();
    // const limit = req.query.limit && req.query.limit < config.maxQueryUser ?
    //     req.query.limit :
    //     config.maxQueryUser;
    //
    // const query = User.find({
    //         previousYears: {
    //             $not: {
    //                 $elemMatch: { year: currentYear }
    //             }
    //         },
    //     });
    //
    // if (req.query.sort && Object.keys(possibleSort).includes(req.query.sort)) {
    //     query.sort({ [possibleSort[req.query.sort]]: 1 });
    // }
    //
    // query.limit(limit);
    //
    // query.exec(function(err, users) {
    //     // @TODO: handle error
    //     const usersData = users.map(user => user.toObject());
    //     res.json(usersData);
    // });

    userService.getUsers()
        .then((users) => {
            const usersData = users.map(user => user.toObject());
            res.json(usersData);
        })
        .catch((err) => {
            // @TODO: handle error
        });
});

// GET user based on userId
userRoutes.get('/user/:userId', function(req, res) {
    User.findOne({ _id: req.params.userId}, function(err, user) {
        // @TODO: handle error
        const userData = user.toObject();
        res.json(userData);
    });
});

// GET user based on userId
userRoutes.get('/user/:userId/votes', function(req, res) {
    User.findOne({ _id: req.params.userId}, function(err, user) {
        // @TODO: handle error
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
        // @TODO: handle error
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

// GET user based on userId
userRoutes.get('/birthdaylist', function(req, res) {
    userService.getBirthDayList()
        .then((users) => {
            const usersData = users.map(user => user.toObject());
            res.json(usersData);
        })
        .catch((err) => {
            // @TODO: handle error
        });
});

module.exports = userRoutes;
