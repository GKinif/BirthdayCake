const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoles = ['user', 'moderator', 'admin'];

const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        role: {
            type: String,
            enum: userRoles,
            default: 'user'
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date, required: true },
        nextBirthDay: { type: Date, required: true },
        profilePic: String,
        previousYears: [
            {
                year: Number,
                cakeDate: Date,
            }
        ],
        votes: [
            {
                dateCreation: { type: Date, default: Date.now },
                author: { userId: String, firstName: String, lastName: String },
            }
        ],
    },
    {
        timestamps: true, // will add createdAt and updatedAt
    }
);

/**
 * User bcrypt to encrypt user password before saving
 */
UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * Return the next birthday based on provided birthDate date
 * @param {Date} birthDate
 * @returns {Date}
 */
UserSchema.statics.calculateNextBirthDay = function(birthDate) {
    let nextBirthDay;
    const day = birthDate.getDate();
    const month = birthDate.getMonth();
    const currentYear = new Date().getFullYear();

    if (new Date(currentYear, month, day) < new Date()) {
        nextBirthDay = new Date(currentYear + 1, month, day);
    } else {
        nextBirthDay = new Date(currentYear, month, day);
    }

    return nextBirthDay;
};

/**
 * Compare provided password with the user password
 * @param {String} password
 * @returns {*}
 */
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

/**
 * Remove the _id and password property from object when using model.toObject()
 */
if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret._id;
    delete ret.password;
    return ret;
};

module.exports = mongoose.model('User', UserSchema);