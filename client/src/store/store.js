/* eslint no-shadow: "off", no-param-reassign: "off" */
import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './types';
import users from './modules/users';
import flashMessage from './modules/flashMessage';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
    },
    getters: {
        [types.GET_ISLOGGEDIN]: state => state.isLoggedIn,
    },
    mutations: {
        [types.SET_ISLOGGEDIN](state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
    },
    actions: {
        [types.SET_ISLOGGEDIN]: ({ commit }, isLoggedIn) => {
            commit(types.SET_ISLOGGEDIN, isLoggedIn);
        },
    },
    modules: {
        users,
        flashMessage,
    },
});
