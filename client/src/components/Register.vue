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
                    <select v-model="day" id="day">
                        <option v-for="day in possibleDay">{{ day }}</option>
                    </select>
                    <label for="month">Month</label>
                    <select v-model="month" id="month">
                        <option v-for="month in possibleMonth">{{ month }}</option>
                    </select>
                    <label for="year">Year</label>
                    <select v-model="year" id="year">
                        <option v-for="year in possibleYear">{{ year }}</option>
                    </select>
                </div>
            </fieldset>

            <button @click.prevent="register">Register</button>
        </form>
    </div>
</template>

<script>
    // import authService from '../services/authService';

    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                day: '',
                month: '',
                year: '',
            };
        },
        computed: {
            birthDate() {
                if (isFinite(this.day) && isFinite(this.month) && isFinite(this.year)) {
                    return new Date(this.year, this.month, this.day);
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
            range(start, end) {
                return Array.from({ length: (end - start) + 1 }, (v, k) => k + start);
            },
            register() {
                // @TODO: register the user
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
