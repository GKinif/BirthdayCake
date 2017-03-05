import {userRoles} from '../../server/app/models/User';

function userValidation() {
    function isEmailValid(email) {
        const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return !!email && re.test(email);
    }

    function isPasswordValid(password) {
        return !!password && typeof password === 'string' && password.length > 3;
    }

    function isRoleValid(role) {
        return !!role && userRoles.indexOf(role) > -1;
    }

    function isFirstNameValid(firstName) {
        return !!firstName && typeof firstName === 'string' && firstName.length > 1;
    }

    function isLastNameValid(lastName) {
        return !!lastName && typeof lastName === 'string' && lastName.length > 1;
    }

    function isBirthDateValid(birthDate) {
        return !!birthDate && isFinite(new Date(birthDate).getTime());
    }

    function isProfilePicNameValid() {
        // @TODO: validate image extension from image name
        return true;
    }

    function isProfilePicValid() {
        // @TODO: validate incoming image server side
        return true;
    }

    function isUserValid(userData) {
        return (
            isEmailValid(userData.email) &&
            isPasswordValid(userData.password) &&
            isFirstNameValid(userData.firstName) &&
            isLastNameValid(userData.lastName) &&
            isBirthDateValid(userData.birthDate)
        );
    }
    return {
        isEmailValid,
        isPasswordValid,
        isRoleValid,
        isFirstNameValid,
        isLastNameValid,
        isBirthDateValid,
        isProfilePicNameValid,
        isProfilePicValid,
        isUserValid
    };
}

module.exports = userValidation();
