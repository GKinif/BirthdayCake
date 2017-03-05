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
            }),
            authenticate() {
                authService.authenticate(this.email, this.password)
                    .then((data) => {
                        this.showFlash({
                            text: data.message,
                            type: 'success',
                        });
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
