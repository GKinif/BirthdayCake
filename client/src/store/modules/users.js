/* eslint no-shadow: "off", no-param-reassign: "off" */
import userService from '../../services/userService';
import * as types from '../types';

function isUserBirthCakeOk(user) {
    const currentDate = new Date();
    const isBirthdateAlreadyPassed = user.birthDate.getMonth() < currentDate.getMonth() ||
        (
            user.birthDate.getDate() <= currentDate.getDate() &&
            user.birthDate.getMonth() <= currentDate.getMonth()
        );
    const lastBirthdayCake = Math.max(...user.previousYears.map(year => year.year));

    return !isBirthdateAlreadyPassed ||
        currentDate.getFullYear() <= Number(lastBirthdayCake);
}

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
    [types.LOAD_BIRTHDAY_LIST]: ({ commit }) => {
        userService.getBirthDayList().then((users) => {
            commit(types.SET_USERS, users);
        }).catch(); // @TODO: show info message to the user telling we are not able to get users
    },
};

const getters = {
    [types.GET_USERS]: state => state.users,
    [types.GET_SHAMED_USERS]: state => state.users.filter(user => !isUserBirthCakeOk(user)),
    [types.GET_GOOD_USERS]: state => state.users.filter(user => isUserBirthCakeOk(user)),
};

export default {
    state,
    mutations,
    actions,
    getters,
};
