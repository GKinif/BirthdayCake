<template>
    <div id="app">
        <img class="logo" src="./assets/logo3.png">
        <app-header></app-header>
        <user-list :userList="shamedUserList" :isShamedUsers="true"></user-list>
        <user-list :userList="goodUserList"></user-list>
    </div>
</template>

<script>
    import userServices from './services/userServices';
    import Header from './components/Header';
    import UserList from './components/user/UserList';

    export default {
        name: 'app',
        data() {
            return {
                shamedUserList: [],
                goodUserList: [],
            };
        },
        created() {
            userServices.getShamedUsers()
                .then(users => this.shamedUserList = users.sort((a, b) => {
                    const year = new Date().getFullYear();
                    const dateA = new Date(year, a.birthdate.getMonth(), a.birthdate.getDate());
                    const dateB = new Date(year, b.birthdate.getMonth(), b.birthdate.getDate());
                    return dateA > dateB;
                }));
            userServices.getGoodUsers()
                .then(users => this.goodUserList = users.sort((a, b) => {
                    const year = new Date().getFullYear();
                    const dateA = new Date(year, a.birthdate.getMonth(), a.birthdate.getDate());
                    const dateB = new Date(year, b.birthdate.getMonth(), b.birthdate.getDate());
                    return dateA > dateB;
                }));
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
