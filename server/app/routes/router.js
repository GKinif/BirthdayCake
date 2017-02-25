const express = require('express');
const authenticationRoutes = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// basic route
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:8080/api');
});

// apply the routes to our application with the prefix /api
router.use('/api', authenticationRoutes);
router.use('/api', userRoutes);


module.exports = router;
