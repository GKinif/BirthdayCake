const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    registerId: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    link: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    creator : { type: Schema.Types.ObjectId, ref: 'User' },
    isUsed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
