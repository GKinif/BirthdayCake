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
            authenticate() {
                authService.authenticate(this.email, this.password)
                    .then((/* data */) => {
                        // @TODO: show a success message to the user
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
