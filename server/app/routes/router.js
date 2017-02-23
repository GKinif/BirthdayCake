const express = require('express');
const userRoutes = require('./userroutes');

const router = express.Router();

// basic route
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:8080/api');
});

router.get('/setup', function(req, res) {

    // create a sample user
    var dude = new User({
        name: 'The Dude',
        password: 'password',
        admin: true
    });

    // save the sample user
    dude.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// apply the routes to our application with the prefix /api
router.use('/api', userRoutes);

module.exports = router;
