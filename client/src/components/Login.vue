<template>
    <div class="container">
        <form>
            <label for="email">Email</label>
            <input type="email" id="email" name="email">

            <label for="password">Password</label>
            <input type="password" id="password" name="password">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'login',
    };
</script>

<style scoped>
    .container {
        text-align: center;
    }
</style>
