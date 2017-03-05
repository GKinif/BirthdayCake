<template>
    <div id="app">
        <img class="logo" src="./assets/logo3.png">
        <app-header></app-header>
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
        <flash-message></flash-message>
    </div>
</template>

<script>
    import Header from './components/Header';
    import FlashMessage from './components/FlashMessage';

    export default {
        name: 'app',
        components: {
            appHeader: Header,
            FlashMessage,
        },
    };
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        background-color: #757575;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0 auto 0 auto;
        padding-bottom: 5px;
        max-width: 600px;
        height: 100%;
        background: #212121;
        color: #FEF9F6;
        position: relative;
    }

    .logo {
        max-width: 100%;
    }
</style>
