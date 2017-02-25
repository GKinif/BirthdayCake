const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    registerId: { type: String, unique: true, required: true},
    email: { type: String, unique: true },
    link: { type: String, required: true},
    dateCreation: { type: Date, default: Date.now },
    author: {
        userId: String,
        firstName: String,
        lastName: String
    },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
