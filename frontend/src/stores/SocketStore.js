import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        connected: false,
        ping: 0
    },
    mutations: {
        CONNECT (state) {
            state.connected = true
        },
        DISCONNECT (state) {
            state.connected = false
        },
        PING (state, ping) {
            state.ping = ping
        }
    },
    actions: {
        connect (context) {
            context.commit('CONNECT')
        },
        disconnect (context) {
            context.commit('DISCONNECT')
        },
        ping (context, ping) {
            context.commit('PING', ping)
        }
    }
}