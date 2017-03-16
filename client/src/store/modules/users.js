/* eslint no-shadow: "off", no-param-reassign: "off" */
import userService from '../../services/userService';
import * as types from '../types';

const state = {
    users: [],
};

const mutations = {
    [types.SET_USERS](state, users) {
        state.users = users;
    },
};

const actions = {
    [types.SET_USERS]: ({ commit }, users) => {
        commit(types.SET_USERS, users);
    },
    [types.LOAD_USERS]: ({ commit }) => {
        userService.getUsers().then((users) => {
            commit(types.SET_USERS, users);
        }).catch(); // @TODO: show info message to the user telling we are not able to get users
    },
    [types.LOAD_BIRTHDAY_LIST]: ({ commit, dispatch }) => {
        userService.getBirthDayList().then((users) => {
            commit(types.SET_USERS, users);
        }).catch(() => {
            const flash = {
                text: 'Unable to get birthday list',
                type: 'warning',
            };
            dispatch(types.SHOW_FLASH_DURATION, flash);
        });
    },
};

const getters = {
    [types.GET_USERS]: state => state.users,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
