<template>
    <div class="container">
        <h2>Register</h2>
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

            <fieldset>
                <!--FIRST NAME-->
                <div class="form-group">
                    <label for="firstname">First name</label>
                    <input type="text" id="firstname" name="firstname" v-model="firstName">
                </div>
                <!--LAST NAME-->
                <div class="form-group">
                    <label for="lastname">Last name</label>
                    <input type="text" id="lastname" name="lastname" v-model="lastName">
                </div>
                <!--BIRTHDATE-->
                <h3>Birth date</h3>
                <div class="form-group">
                    <label for="day">Day</label>
                    <select v-model.number="day" id="day">
                        <option v-for="day in possibleDay">{{ day }}</option>
                    </select>
                    <label for="month">Month</label>
                    <select v-model.number="month" id="month">
                        <option v-for="month in possibleMonth">{{ month }}</option>
                    </select>
                    <label for="year">Year</label>
                    <select v-model.number="year" id="year">
                        <option v-for="year in possibleYear">{{ year }}</option>
                    </select>
                </div>
            </fieldset>

            <button @click.prevent="register">Register</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as types from '../store/types';
    import userService from '../services/userService';

    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                day: null,
                month: null,
                year: null,
            };
        },
        computed: {
            birthDate() {
                if (
                    this.day &&
                    this.month &&
                    this.year
                ) {
                    const day = this.day < 10 ? `0${this.day}` : `${this.day}`;
                    const month = this.month < 10 ? `0${this.month}` : `${this.month}`;
                    return `${this.year}-${month}-${day}`;
                }
                return null;
            },
            possibleDay() {
                return this.range(1, 31);
            },
            possibleMonth() {
                return this.range(1, 12);
            },
            possibleYear() {
                return this.range(1950, new Date().getFullYear()).sort((a, b) => b - a);
            },
        },
        methods: {
            ...mapActions({
                showFlash: types.SHOW_FLASH_DURATION,
            }),
            range(start, end) {
                return Array.from({ length: (end - start) + 1 }, (v, k) => k + start);
            },
            register() {
                const userData = {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    birthDate: this.birthDate,
                };
                // @TODO: validate user data
                const registerId = this.$route.params.registerId;
                userService.registerUser(registerId, userData)
                    .then((data) => {
                        console.log('register: ', data);
                        this.showFlash({
                            text: data.message,
                            type: 'success',
                        });
                    })
                    .catch((err) => {
                        // @TODO: show flash message with error
                        // console.log(err.response.data.message);
                        this.showFlash({
                            text: err.response.data.message,
                            type: 'error',
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

    select {
        flex: 1;
        margin: 0 10px 0 10px;
    }

    .form-group {
        margin-bottom: 5px;
        display: flex;
        align-items: flex-end;
    }
</style>
