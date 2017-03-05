<template>
    <div class="flashContainer" :class="type" v-if="isVisible">
        <span class="message">{{ text }}</span>
        <button class="close" @click="onCloseClick">
            <svg viewBox="0 0 35 35">
                <circle cx="17.5" cy="17.5" r="16"/>
                <line x1="6" y1="6" x2="29" y2="29" />
                <line x1="6" y1="29" x2="29" y2="6" />
            </svg>
        </button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as types from '../store/types';

    export default {
        name: 'flashMessage',
        computed: {
            ...mapGetters({
                text: types.GET_FLASH_TEXT,
                type: types.GET_FLASH_TYPE,
                isVisible: types.GET_FLASH_ISVISIBLE,
            }),
        },
        methods: {
            ...mapActions({
                setVisibility: types.SET_FLASH_ISVISIBLE,
            }),
            onCloseClick() {
                this.setVisibility(false);
            },
        },
    };
</script>

<style>
    .flashContainer {
        border-radius: 10px;
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        display: flex;
        align-items: center;
        height: 50px;
        background-color: #B2DFDB;
        padding: 0 5px 0 5px;
    }

    .flashContainer.success {
        background-color: #009688;
    }
    .flashContainer.warning {
        background-color: #FF9252;
    }
    .flashContainer.error {
        background-color: #FF5252;
    }

    .message {
        flex: 1;
    }

    .close{
        background: none;
        border: none;
        cursor: pointer;
    }

    .close svg{
        width: 40px;
        height:40px;
    }

    .close svg line {
        stroke: #FEF9F6;
        stroke-width: 2px;
        transition: 0.2s ease-out;
    }

    .close svg circle {
        fill: none;
        stroke: #FEF9F6;
        stroke-width: 2px;
        opacity: 0;
        transition: 0.2s ease-out;
    }

    .close:hover svg circle, .close:focus svg circle {
        opacity: 1;
    }
</style>


