import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        connected: false
    },
    mutations: {
        CONNECT (state) {
            state.connected = true
        },
        DISCONNECT (state) {
            state.connected = false
        }
    },
    actions: {
        connect (context) {
            context.commit('CONNECT')
        },
        disconnect (context) {
            context.commit('DISCONNECT')
        }
    }
}