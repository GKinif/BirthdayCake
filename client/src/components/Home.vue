<template>
    <div>
        <user-list :userList="users"></user-list>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as types from '../store/types';
    import UserList from './user/UserList';

    export default {
        name: 'home',
        computed: {
            ...mapGetters({
                users: types.GET_USERS,
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
        },
    };
</script>
