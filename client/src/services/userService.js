/* eslint no-shadow: "off", no-param-reassign: "off" */
// import request from 'superagent';
import axios from 'axios';
import config from '../config';

const userService = () => (
    {
        getUsers() {
            const headers = { Authorization: 'my-auth' };

            return axios.get(`${config.api.baseUrl}${config.api.user}`, { headers })
                .then((data) => {
                    data.data.forEach(user => user.birthDate = new Date(user.birthDate));
                    return data.data;
                });
        },
    }
);

export default userService();
