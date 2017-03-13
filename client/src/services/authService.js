/* eslint no-shadow: "off", no-param-reassign: "off" */
import axios from 'axios';
import config from '../config';

const authService = () => {
    let token = '';

    /**
     * Check the validity of the provided token
     * @param {String} token
     */
    const isTokenValid = token => !!token && token.length > 0 && token.split('.').length === 3;

    /**
     * Convert the provided token insto a string used to authorize request
     * @param {String} token
     */
    const createAuthHeader = token => `JWT ${token}`;

    return {
        /**
         * Authenticate a user using email and password and save the token, return data from api
         * @param {String} email
         * @param {String} password
         * @returns {Promise.<T>}
         */
        authenticate(email, password) {
            return axios.post(
                `${config.api.baseUrl}${config.api.authenticate}`,
                { email, password }
            )
                .then((response) => {
                    token = response.data.token;
                    return response.data;
                })
                .catch((err) => {
                    throw err;
                });
        },

        /**
         * return the header that need to be used to validate a request
         * @returns {Promise.<T>}
         */
        getAuthHeader() {
            if (!isTokenValid(token)) {
                return Promise.reject(new Error('Invalid token'));
            }
            return Promise.resolve(createAuthHeader(token));
        },

        getToken() {
            return token;
        },

        deleteToken() {
            token = null;
        },
    };
};

export default authService();
