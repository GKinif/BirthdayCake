<template>
    <div class="container">
        <h2>Register</h2>
        <form>
            <!--EMAIL-->
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email">
            <!--PASSWORD-->
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">

            <!--FIRST NAME-->
            <label for="firstname">First name</label>
            <input type="text" id="firstname" name="firstname" v-model="firstName">
            <!--LAST NAME-->
            <label for="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname" v-model="lastName">

            <!--BIRTHDATE-->
            <select v-model="day">
                <option v-for="day in possibleDay">{{ day }}</option>
            </select>
            <select v-model="month">
                <option v-for="month in possibleMonth">{{ month }}</option>
            </select>
            <select v-model="year">
                <option v-for="year in possibleYear">{{ year }}</option>
            </select>

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
                return this.range(1950, new Date().getFullYear());
            },
        },
        methods: {
            range(start, end) {
                return Array.from({ length: (end - start) + 1 }, (v, k) => k + start);
            },
        },
    };
</script>

<style scoped>
    .container {
        text-align: center;
    }
</style>
