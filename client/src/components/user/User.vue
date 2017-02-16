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
            <button class="btnIncrease" v-if="isShamed" @click="onIncreaseClicked">
                <svg viewBox="0 0 35 35">
                    <circle cx="17.5" cy="17.5" r="16"/>
                    <line x1="6" y1="17" x2="30" y2="17" />
                    <line x1="18" y1="6" x2="18" y2="30" />
                </svg>
            </button>
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

    .btnIncrease{
        background:none;
        border:none;
        transition: 0.2s ease-out;
        cursor: pointer;
    }

    .btnIncrease svg{
        width: 40px;
        height:40px;
    }
    .btnIncrease svg circle {
        fill: none;
        stroke: #FEF9F6;
        stroke-width: 2px;
        transition: 0.2s ease-out;
    }

    .btnIncrease svg line {
        stroke: #FEF9F6;
        stroke-width: 2px;
        transition: 0.2s ease-out;
    }

    .btnIncrease:hover, .btnIncrease:focus {
        transform: scale(1.1);
    }

    .btnIncrease:hover svg circle, .btnIncrease:focus svg circle {
        stroke: #009688;
    }

    .btnIncrease:hover svg line, .btnIncrease:focus svg line {
        stroke: #009688;
    }
</style>
