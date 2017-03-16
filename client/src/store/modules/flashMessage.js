/* eslint no-shadow: "off", no-param-reassign: "off" */
import * as types from '../types';

let flashTimer;

const state = {
    isVisible: false,
    text: '',
    type: '', // can be success, warning or error
};

const mutations = {
    /**
     * Set the flash state with a new one
     * @param state
     * @param {{message: string, type: string, isVisible: boolean}} flash
     */
    [types.SET_FLASH]: (state, flash) => {
        if (flash.text) {
            state.text = flash.text;
        }
        if (flash.type) {
            state.type = flash.type;
        }
        if (flash.isVisible) {
            state.isVisible = true;
        } else {
            state.isVisible = false;
        }
    },
    /**
     * Set the message of the Flash message
     * @param state
     * @param {string} text
     */
    [types.SET_FLASH_TEXT](state, text) {
        state.text = text;
    },
    /**
     * Set the visibility of the flash Message
     * @param state
     * @param {boolean} isVisible
     */
    [types.SET_FLASH_ISVISIBLE](state, isVisible) {
        state.isVisible = isVisible;
    },
    /**
     * Set the type of the Flash Message
     * Can be success, warning or error
     * @param state
     * @param {string} type
     */
    [types.SET_FLASH_TYPE](state, type) {
        state.type = type;
    },
};

const actions = {
    /**
     * Commit new Flash (full or partial)
     * @param commit
     * @param {{message: string, type: string, isVisible: boolean}} flash
     */
    [types.SET_FLASH]: ({ commit }, flash) => {
        commit(types.SET_FLASH, flash);
    },
    /**
     * Commit new text
     * @param commit
     * @param {string} text
     */
    [types.SET_FLASH_TEXT]: ({ commit }, text) => {
        commit(types.SET_FLASH_TEXT, text);
    },
    /**
     * Commit isVisible property to the flash message
     * @param commit
     * @param {boolean} isVisible
     */
    [types.SET_FLASH_ISVISIBLE]: ({ commit }, isVisible) => {
        commit(types.SET_FLASH_ISVISIBLE, isVisible);
    },
    /**
     * Commit Flash message type
     * @param commit
     * @param {string} type
     */
    [types.SET_FLASH_TYPE]: ({ commit }, type) => {
        commit(types.SET_FLASH_TYPE, type);
    },
    /**
     * Show the flash message during <duration> secondes
     * @param commit
     * @param {{text: string, type: string, duration: number}} flash
     */
    [types.SHOW_FLASH_DURATION]: ({ commit }, flash) => {
        commit(types.SET_FLASH, { text: flash.text, type: flash.type, isVisible: true });
        const duration = flash.duration || 5;

        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => commit(types.SET_FLASH_ISVISIBLE, false), duration * 1000);
    },
};

const getters = {
    [types.GET_FLASH_TEXT]: state => state.text,
    [types.GET_FLASH_ISVISIBLE]: state => state.isVisible,
    [types.GET_FLASH_TYPE]: state => state.type,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
