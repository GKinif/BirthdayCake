/* eslint no-shadow: "off", no-param-reassign: "off" */
import axios from 'axios';
import config from '../config';

const userService = () => (
    {
        getUsers() {
            const headers = { Authorization: 'my-auth' };

            return axios.get(`${config.api.baseUrl}${config.api.user}`, { headers })
                .then((response) => {
                    response.data.forEach(user => user.birthDate = new Date(user.birthDate));
                    return response.data;
                });
        },
        registerUser(registerId, userData) {
            const payload = Object.assign(
                {},
                userData,
                { registerId },
            );
            return axios.post(`${config.api.baseUrl}${config.api.register}`, payload)
                .then(response => response.data);
        },
    }
);

export default userService();
