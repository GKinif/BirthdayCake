/* eslint no-shadow: "off", no-param-reassign: "off" */
import * as types from '../types';

const state = {
    isLoggedIn: false,
    loggedUser: {},
};

const getters = {
    [types.GET_LOGGEDUSER]: state => state.loggedUser,
    [types.GET_ISLOGGEDIN]: state => state.isLoggedIn,
};

const mutations = {
    [types.SET_LOGGEDUSER](state, user) {
        state.loggedUser = user;
    },
    [types.SET_ISLOGGEDIN](state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
    },
};

const actions = {
    [types.SET_LOGGEDUSER]: ({ commit }, user) => {
        user.birthDate = new Date(user.birthDate);
        user.nextBirthDay = new Date(user.nextBirthDay);
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        commit(types.SET_LOGGEDUSER, user);
    },
    [types.SET_ISLOGGEDIN]: ({ commit }, isLoggedIn) => {
        commit(types.SET_ISLOGGEDIN, isLoggedIn);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
