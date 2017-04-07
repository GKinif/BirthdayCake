const userRoles = ['user', 'moderator', 'admin'];

function userValidation() {
    /**
     * Validate email
     * @param {string} email
     * @returns {boolean}
     */
    function isEmailValid(email) {
        const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return !!email && re.test(email);
    }

    /**
     * Validate password
     * @param {string} password
     * @returns {boolean}
     */
    function isPasswordValid(password) {
        return !!password && typeof password === 'string' && password.length > 3;
    }

    /**
     * Validate role
     * @param {string} role
     * @returns {boolean}
     */
    function isRoleValid(role) {
        return !!role && userRoles.indexOf(role) > -1;
    }

    /**
     * Validate name
     * @param {string} name
     * @returns {boolean}
     */
    function isNameValid(name) {
        return !!name && typeof name === 'string' && name.length > 1;
    }

    /**
     * Validate date
     * @param {string} date
     * @returns {boolean}
     */
    function isDateValid(date) {
        return !!date && isFinite(new Date(date).getTime());
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
            isNameValid(userData.firstName) &&
            isNameValid(userData.lastName) &&
            isDateValid(userData.birthDate) &&
            isDateValid(userData.nextBirthDay)
        );
    }
    return {
        isEmailValid,
        isPasswordValid,
        isRoleValid,
        isNameValid,
        isDateValid,
        isProfilePicNameValid,
        isProfilePicValid,
        isUserValid
    };
}

module.exports = userValidation();
