<template>
    <ul>
        <user v-for="user in userList" :user="user" :isShamed="isShamedUsers"></user>
    </ul>
</template>

<script>
    import User from './User';

    export default {
        props: ['userList', 'isShamedUsers'],
        components: {
            User,
        },
    };
</script>

<style scoped>
    ul {
        list-style-type: none;
        margin: 0 10px 0 10px;
        padding: 0;
        box-sizing: border-box;
    }
</style>
