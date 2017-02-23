// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: Boolean,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    profilePic: String,
    previousYears: [
        {
            year: Number,
            cakeDate: Date,
        }
    ],
    votes: [
        {
            dateCreation: Date,
            author: { userId: String, firstName: String, lastName: String },
        }
    ],
}));