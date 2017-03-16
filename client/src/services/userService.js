/* eslint no-shadow: "off", no-param-reassign: "off" */
import axios from 'axios';
import config from '../config';

const userService = () => (
    {
        getUsers() {
            return axios.get(`${config.api.baseUrl}${config.api.user}`)
                .then((response) => {
                    response.data.forEach(user => user.birthDate = new Date(user.birthDate));
                    return response.data.data;
                });
        },
        getUser(userId) {
            return axios.get(`${config.api.baseUrl}${config.api.user}/${userId}`)
                .then(response => response.data.data);
        },
        getBirthDayList() {
            return axios.get(`${config.api.baseUrl}${config.api.birthDayList}`)
                .then((response) => {
                    response.data.data.forEach((user) => {
                        user.birthDate = new Date(user.birthDate);
                        user.nextBirthDay = new Date(user.nextBirthDay);
                    });
                    return response.data.data;
                });
        },
        getRegisterId(authHeader) {
            const headers = { Authorization: authHeader };
            return axios.get(`${config.api.baseUrl}${config.api.register}`, { headers })
                .then(response => response.data);
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
        addVote(userId, authHeader) {
            const headers = { Authorization: authHeader };

            return axios
                .post(`${config.api.baseUrl}${config.api.user}/${userId}/votes`, {}, { headers })
                .then(response => response.data);
        },
    }
);

export default userService();
