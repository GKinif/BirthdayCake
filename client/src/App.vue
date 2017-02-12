<template>
    <div id="app">
        <img class="logo" src="./assets/logo3.png">
        <app-header></app-header>
        <user-list :userList="shamedUsers" :isShamedUsers="true"></user-list>
        <user-list :userList="goodUsers"></user-list>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as types from './store/types';
    import Header from './components/Header';
    import UserList from './components/user/UserList';

    export default {
        name: 'app',
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
            appHeader: Header,
            UserList,
        },
    };
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        background-color: #757575;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
        margin-left: auto;
        margin-right: auto;
        max-width: 600px;
        height: 100%;
        background: #212121;
        color: #212121;
    }

    .logo {
        max-width: 100%;
    }
</style>
