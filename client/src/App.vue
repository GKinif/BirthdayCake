<template>
    <div id="app">
        <img src="./assets/logo.png">
        <hello></hello>
        <user-list :userList="shamedUserList" :isShamedUsers="true"></user-list>
        <user-list :userList="goodUserList"></user-list>
    </div>
</template>

<script>
    import userServices from './services/userServices';
    import Hello from './components/Hello';
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
            Hello,
            UserList,
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
        max-width: 600px;
    }
</style>
