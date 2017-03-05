import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import flashMessage from './modules/flashMessage';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        flashMessage,
    },
});
