<template>
    <div>
        <birthday-message v-if="isLoggedIn" :loggedUser="loggedUser"></birthday-message>
        <user-list :userList="users"></user-list>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as types from '../store/types';
    import UserList from './user/UserList';
    import BirthdayMessage from './BirthdayMessage';

    export default {
        name: 'home',
        computed: {
            ...mapGetters({
                users: types.GET_USERS,
                isLoggedIn: types.GET_ISLOGGEDIN,
                loggedUser: types.GET_LOGGEDUSER,
            }),
        },
        methods: {
            ...mapActions({
                loadBirthDayList: types.LOAD_BIRTHDAY_LIST,
            }),
        },
        created() {
            this.loadBirthDayList();
        },
        components: {
            UserList,
            BirthdayMessage,
        },
    };
</script>
