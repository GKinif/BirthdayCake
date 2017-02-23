const mongoose = require('mongoose');
require('dotenv').config();
const usersFixtures = require('./usersFixtures');

mongoose.connect(process.env.DB); // connect to database

const fixtures = {
    usersFixtures,
};

Object.keys(fixtures).forEach(fixture => {
    fixtures[fixture].addSamplesToDB()
});