const mongoose = require('mongoose');
require('dotenv').config();
const usersFixtures = require('./usersFixtures');

mongoose.connect(process.env.DB); // connect to database

const fixtures = {
    usersFixtures,
};

Object.keys(fixtures).forEach(fixture => {
    if (fixtures[fixture].hasOwnProperty('addSamplesToDB')) {
        fixtures[fixture].addSamplesToDB();
    } else {
        console.log(`Fixture <${fixture}> is missing method addSamplesToDB`);
    }
});