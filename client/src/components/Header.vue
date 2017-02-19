<template>
    <div class="container">
        <h1>Birthday Cake</h1>
        <ul>
            <li><router-link :to="{ name: 'home'}" active-class="active" exact>Home</router-link></li>
            <li><router-link :to="{ name: 'login'}" active-class="active">Login</router-link></li>
        </ul>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #757575;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }

    h1{
        font-weight: normal;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        justify-content: space-around;
    }

    li {
        display: inline-block;
        box-sizing: border-box;
        margin: 0 5px 0 5px;
        flex: 1;
    }

    a {
        box-sizing: border-box;
        display: block;
        width: 100%;
        color: #FFD49F;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        outline: 0;
    }
    a.active {
        background-color: #757575;
    }
    a:focus {
        box-sizing: border-box;
        border: 1px solid #FFD49F;
    }
</style>
