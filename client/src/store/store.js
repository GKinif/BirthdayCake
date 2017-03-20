/* eslint no-shadow: "off", no-param-reassign: "off" */
import Vue from 'vue';
import Vuex from 'vuex';

import loggedUser from './modules/loggedUser';
import users from './modules/users';
import flashMessage from './modules/flashMessage';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loggedUser,
        users,
        flashMessage,
    },
});
