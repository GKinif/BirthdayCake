<template>
    <ul>
        <user v-for="user in userList" :user="user" :isShamed="isShamedUsers"></user>
    </ul>
</template>

<script>
    import User from './User';

    export default {
        name: 'app',
        props: ['userList', 'isShamedUsers'],
        components: {
            User,
        },
    };
</script>

<style scoped>
    ul {
        list-style-type: none;
    }
</style>
