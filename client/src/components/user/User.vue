<template>
    <li>
        <div class="profilePic">
            <img :src="user.profilePic" alt="profile picture">
        </div>
        <div class="informations" :class="{ informationRed: isShamed }">
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <p>Birthday: {{ birthday }}</p>
        </div>
        <div class="actions">
            <a @click="onUpClicked" class="arrow-up" tabindex="0" role="button"></a>
            <a @click="onDownClicked" class="arrow-down" tabindex="0" role="button"></a>
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
            onUpClicked() {
            },
            onDownClicked() {
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
        background: #FFFFFF;
        margin: 5px 0 5px 0;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
        height: 150px;
        position: relative;
    }

    .profilePic {
        box-sizing: border-box;
        height: 100%;
        border-right: 1px solid #CCCCCC;
        background: #FAFAFA;
        position: relative;
        width: 120px;
    }

    .profilePic img {
        box-sizing: border-box;
        max-height: 130px;
        border-radius: 50%;
        border: 1px solid #CCCCCC;
        position: absolute;
        left: 10px;
        top: 10px;
    }

    .informations {
        box-sizing: border-box;
        padding: 10px 0 10px 0;
    }

    .informationRed {
        box-shadow: inset 0 0 10px #D96A63;
        background: #FFF3F2;
    }

    .actions {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 60px;
        height: 100%;
        border-left: 1px solid #CCCCCC;
        background: #FAFAFA;
    }

    .arrow-up {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid #CCCCCC;
    }

    .arrow-down {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid #CCCCCC;
    }
</style>
