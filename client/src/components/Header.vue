<template>
    <div class="container">
        <h1>Birthday Cake</h1>
        <ul>
            <li><router-link class="menuItem" :to="{ name: 'home'}" active-class="active" exact>Home</router-link></li>
            <li v-if="!isLoggedIn"><router-link class="menuItem" :to="{ name: 'login'}" active-class="active">Login</router-link></li>
            <li v-if="isLoggedIn"><router-link class="menuItem" :to="{ name: 'invite'}" active-class="active">Invite</router-link></li>
            <li v-if="isLoggedIn"><button class="menuItem" @click.prevent="logout">Logout</button></li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as types from '../store/types';
    import authService from '../services/authService';

    export default {
        name: 'header',
        computed: {
            ...mapGetters({
                isLoggedIn: types.GET_ISLOGGEDIN,
            }),
        },
        methods: {
            ...mapActions({
                setIsLoggedIn: types.SET_ISLOGGEDIN,
            }),
            logout() {
                authService.deleteToken();
                this.setIsLoggedIn(false);
                this.$router.push({ name: 'home' });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #757575;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }

    h1{
        font-weight: normal;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        justify-content: space-around;
    }

    li {
        display: inline-block;
        box-sizing: border-box;
        margin: 0 5px 0 5px;
        flex: 1;
    }

    button {
        background-color: transparent;
        border: none;
    }

    .menuItem {
        box-sizing: border-box;
        display: block;
        width: 100%;
        color: #FFD49F;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        outline: 0;
        font-size: 1em;
        cursor: pointer;
    }

    .menuItem.active {
        background-color: #757575;
    }
    .menuItem:focus, .menuItem:hover {
        box-sizing: border-box;
        border: 1px solid #FFD49F;
    }
</style>
