const express = require('express');
const authenticationRoutes = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');
const registerRoutes = require('./registerRoutes');

const router = express.Router();

// basic route
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:8080/api');
});

//CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, authorization');

    next();
};

router.use('/api', allowCrossDomain);

// apply the routes to our application with the prefix /api
router.use('/api', authenticationRoutes);
router.use('/api', registerRoutes);
router.use('/api', userRoutes);


module.exports = router;
