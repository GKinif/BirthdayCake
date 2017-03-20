<template>
    <div class="container" v-if="isBirthDay || isShamed" :class="{ isBirthDay: isBirthDay, isShamed: isShamed }">
        <p v-if="isBirthDay">
            All your amazing colleagues want to wish you a <strong>Happy Birthday</strong>
            , you are the best. Have a beautiful day, and don't forget the cake
        </p>
        <p v-if="isShamed">
            Your colleagues were good to you all the year, and now they are waiting for something for you. <br />
            If possible something they can eat.
        </p>
    </div>
</template>

<script>
    export default {
        name: 'BirthdayMessage',
        props: ['loggedUser'],
        computed: {
            isBirthDay() {
                const currentDate = new Date();
                return (
                    currentDate.getFullYear() === this.loggedUser.nextBirthDay.getFullYear() &&
                    currentDate.getMonth() === this.loggedUser.nextBirthDay.getMonth() &&
                    currentDate.getDate() === this.loggedUser.nextBirthDay.getDate()
                );
            },
            isShamed() {
                const currentDate = new Date();
                const prevYear = this.loggedUser.previousYears.find(
                    current => current.year === currentDate.getFullYear()
                );
                return this.loggedUser.nextBirthDay < currentDate && !prevYear;
            },
        },
    };
</script>

<style scoped>
    .container {
        margin: 0;
        padding: 5px 15px;
    }

    .isBirthDay {
        background-color: #009688;
    }

    .isShamed {
        background-color: #FF5252;
    }
</style>
