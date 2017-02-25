const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const config = require('./config/config');
const passportStrategy = require('./config/passportStrategy');
const router = require('./app/routes/router');

// =======================
// configuration =========
// =======================
mongoose.connect(config.db); // connect to database

// initialize passport
passport.use(passportStrategy);
app.use(passport.initialize());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
app.use(router);

// =======================
// start the server ======
// =======================
app.listen(config.port);
console.log('Magic happens at http://localhost:' + config.port);