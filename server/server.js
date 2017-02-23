const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const router = require('./app/routes/router');

// =======================
// configuration =========
// =======================
mongoose.connect(config.database); // connect to database

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
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens at http://localhost:' + port);