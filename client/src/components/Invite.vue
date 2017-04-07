<template>
    <div class="container">
        <form>
            <fieldset>
                <!--EMAIL-->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" v-model="email">
                </div>
            </fieldset>
            <button @click.prevent="showRegisterUrl">Invite</button>
        </form>

        <p v-if="isRegisterUrlVisible">{{ message }}</p>
        <span v-if="isRegisterUrlVisible">
            <router-link :to="{ name: 'register', params: { registerId: registerId }}" active-class="active" exact>Copy me, lazy cake eater</router-link>
        </span>

    </div>
</template>

<script>
    import userService from '../services/userService';
    import authService from '../services/authService';

    export default {
        name: 'invite',
        data() {
            return {
                email: '',
                isRegisterUrlVisible: false,
                registerId: '',
                message: '',
                messageList: [
                    `Common, you really thought I will do it for you?
                    You can send this url yourself`,

                    'Hmmm, I was too lazy to send a mail, you will have to do it yourself...',
                ],
            };
        },
        methods: {
            pickMessage() {
                const rand = Math.floor(Math.random() * this.messageList.length);
                this.message = this.messageList[rand];
            },
            showRegisterUrl() {
                this.isRegisterUrlVisible = true;
                this.pickMessage();

                authService.getAuthHeader().then((authHeader) => {
                    userService.getRegisterId(authHeader).then((data) => {
                        this.registerId = data.data.registerId;
                    });
                });
            },
        },
    };
</script>

<style scoped>
    .container {
        text-align: center;
    }

    fieldset {
        border: 0;
        margin: 0 0 10px 0;
        padding: 0;
    }

    input {
        box-sizing: border-box;
        flex: 2;
        margin: 0 10px 0 10px;
        background-color: transparent;
        color: #FEF9F6;
        border: 0px;
        border-bottom: 1px solid #ccc;
        height: 25px;
        font-size: 15px;
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid #FFD49F;
    }

    label {
        display: inline-block;
        box-sizing: border-box;
        text-align: right;
        font-weight: bold;
        flex: 1;
        padding: 0 10px 3px 0;
    }

    .form-group {
        margin-bottom: 5px;
        display: flex;
        align-items: flex-end;
    }

    button {
        box-sizing: border-box;
        background-color: transparent;
        border: 1px solid #ccc;
        color: #FEF9F6;
        padding: 10px;
        border-radius: 5px;
        outline: 0;
        font-size: 1em;
    }
    button:active {
        background-color: #757575;
    }
    button:focus, button:hover {
        color: #FFD49F;
        border: 2px solid #FFD49F;
    }
</style>
