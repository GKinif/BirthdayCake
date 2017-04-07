<template>
    <div class="container">
        <form>
            <fieldset>
                <!--EMAIL-->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" v-model="email">
                </div>
                <!--PASSWORD-->
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password">
                </div>
            </fieldset>

            <button type="button" @click="authenticate">Authenticate</button>
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
                setLoggedUser: types.SET_LOGGEDUSER,
            }),
            authenticate() {
                authService.authenticate(this.email, this.password)
                    .then((response) => {
                        if (response.success) {
                            this.showFlash({
                                text: response.message,
                                type: 'success',
                            });
                            this.setIsLoggedIn(true);
                            this.setLoggedUser(response.data.user);
                            this.$router.push({ name: 'home' });
                        } else {
                            this.showFlash({
                                text: response.message,
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

    fieldset {
        border: 0;
        margin: 0 0 10px 0;
        padding: 0;
    }

    input {
        box-sizing: border-box;
        flex: 2;
        margin: 0 10px 0 10px;
        background-color: transparent;
        color: #FEF9F6;
        border: 0px;
        border-bottom: 1px solid #ccc;
        height: 25px;
        font-size: 15px;
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid #FFD49F;
    }

    label {
        display: inline-block;
        box-sizing: border-box;
        text-align: right;
        font-weight: bold;
        flex: 1;
        padding: 0 10px 3px 0;
    }

    .form-group {
        margin-bottom: 5px;
        display: flex;
        align-items: flex-end;
    }

    button {
        box-sizing: border-box;
        background-color: transparent;
        border: 1px solid #ccc;
        color: #FEF9F6;
        padding: 10px;
        border-radius: 5px;
        outline: 0;
        font-size: 1em;
    }

    button:active {
        background-color: #757575;
    }
    button:focus, button:hover {
        color: #FFD49F;
        border: 2px solid #FFD49F;
    }
</style>
