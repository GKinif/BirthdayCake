<template>
    <div class="container">
        <form>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email">

            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
            <button @click.prevent="authenticate">Authenticate</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as types from '../store/types';
    import authService from '../services/authService';

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            ...mapActions({
                showFlash: types.SHOW_FLASH_DURATION,
                setIsLoggedIn: types.SET_ISLOGGEDIN,
            }),
            authenticate() {
                authService.authenticate(this.email, this.password)
                    .then((data) => {
                        if (data.success) {
                            this.showFlash({
                                text: data.message,
                                type: 'success',
                            });
                            this.setIsLoggedIn(true);
                        } else {
                            this.showFlash({
                                text: data.message,
                                type: 'error',
                            });
                            this.setIsLoggedIn(false);
                        }
                    });
            },
        },
    };
</script>

<style scoped>
    .container {
        text-align: center;
    }
</style>
