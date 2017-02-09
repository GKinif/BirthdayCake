<template>
    <li>
        <div class="profilePic" :class="{ bdayWarning: isShamed, bdayOk: !isShamed }">
            <img :src="user.profilePic" alt="profile picture">
        </div>
        <div class="informations">
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <p>Birthday: {{ birthday }}</p>
        </div>
        <div class="actions" :class="{ bdayWarning: isShamed, bdayOk: !isShamed }">
            <button class="btnIncrease" v-if="isShamed" @click="onIncreaseClicked">+</button>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['user', 'isShamed'],
        computed: {
            birthday() {
                const day = this.user.birthdate.getDate() < 10 ?
                    `0${this.user.birthdate.getDate()}` :
                    `${this.user.birthdate.getDate()}`;
                const month = this.user.birthdate.getMonth() + 1 < 10 ?
                    `0${this.user.birthdate.getMonth() + 1}` :
                    `${this.user.birthdate.getMonth() + 1}`;
                return `${day} / ${month}`;
            },
        },
        methods: {
            onIncreaseClicked() {
                // add votes for the user to help him being  unashamed
            },
        },
    };
</script>

<style scoped>
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        background: #FEF9F6;
        margin: 5px 0 5px 0;
        border-radius: 5px;
        height: 150px;
        position: relative;
        overflow: hidden;
    }

    .profilePic {
        box-sizing: border-box;
        height: 100%;
        border-right: 1px solid #212121;
        background: #93C0A4;
        position: relative;
        width: 120px;
    }

    .profilePic img {
        box-sizing: border-box;
        max-height: 130px;
        border-radius: 50%;
        border: 1px solid #212121;
        position: absolute;
        left: 10px;
        top: 10px;
    }

    .informations {
        box-sizing: border-box;
        padding: 10px 0 10px 0;
        flex: 1;
    }

    .bdayWarning {
        background: #FF5252;
    }
    .bdayOk {
        background: #009688;
    }

    .actions {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 60px;
        height: 100%;
        border-left: 1px solid #212121;
    }

    .btnIncrease {
        box-sizing: border-box;
        padding: 0;
        color: #FEF9F6;
        background-color: transparent;
        border: 2px solid #FEF9F6;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        line-height: 30px;
        font-size: 2em;
        cursor: pointer;
        transition: width .5s, height .5s, line-height .5s;
    }

    .btnIncrease:hover, .btnIncrease:focus {
        color: #009688;
        border: 2px solid #009688;
        height: 40px;
        width: 40px;
        line-height: 40px;
    }
</style>
