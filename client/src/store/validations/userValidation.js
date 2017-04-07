export default {
    /**
     * Validate email
     * @param {string} email
     * @returns {boolean}
     */
    isEmailValid(email) {
        // eslint-disable-next-line max-len
        const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return !!email && re.test(email);
    },

    /**
     * Validate password
     * @param {string} password
     * @returns {boolean}
     */
    isPasswordValid(password) {
        return !!password && typeof password === 'string' && password.length > 3;
    },

    /**
     * Validate Name
     * @param {string} name
     * @returns {boolean}
     */
    isNameValid(name) {
        return !!name && typeof name === 'string' && name.length > 1;
    },

    /**
     * Validate date
     * @param {string} date
     * @returns {boolean}
     */
    isDateValid(date) {
        return !!date && isFinite(new Date(date).getTime());
    },
};
