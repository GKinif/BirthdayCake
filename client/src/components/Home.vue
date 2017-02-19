<template>
    <div>
        <user-list :userList="shamedUsers" :isShamedUsers="true"></user-list>
        <user-list :userList="goodUsers"></user-list>
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
                goodUsers: types.GET_GOOD_USERS,
                shamedUsers: types.GET_SHAMED_USERS,
            }),
        },
        methods: {
            ...mapActions({
                loadUsers: types.LOAD_USERS,
            }),
        },
        created() {
            this.loadUsers();
        },
        components: {
            UserList,
        },
    };
</script>
