/* eslint no-shadow: "off", no-param-reassign: "off" */
import userServices from '../../services/userServices';
import * as types from '../types';

function isUserBirthCakeOk(user) {
    const currentDate = new Date();
    const isBirthdateAlreadyPassed = user.birthdate.getMonth() < currentDate.getMonth() ||
        (
            user.birthdate.getDate() <= currentDate.getDate() &&
            user.birthdate.getMonth() <= currentDate.getMonth()
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
        userServices.getUsers().then(users => commit(types.SET_USERS, users));
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
