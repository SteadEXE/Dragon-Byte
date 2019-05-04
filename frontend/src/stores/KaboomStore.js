import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        players: [],
        status: 'init'
    },
    mutations: {
        UPDATE_PLAYERS (state, players) {
            state.players = players
        }
    },
    actions: {
        updatePlayers (context, players) {
            context.commit('UPDATE_PLAYERS', players)
        }
    }
})