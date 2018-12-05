import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: 'init',
        bets: {
            red: [ ],
            black: [ ],
            green: [ ],
        },
        offset: 0,
        origin: 0,
        slot: 0,
        end: 0,
        jackpot: 0,
        earnings: 0,
        losses: 0
    },
    mutations: {
        UPDATE_STATE (state, roulette) {
            state.status = roulette.status
            state.offset = roulette.offset
            state.origin = roulette.origin
            state.slot = roulette.slot
            state.end = Date.now() + roulette.remaining
            state.jackpot = roulette.jackpot
            state.earnings = roulette.earnings
            state.losses = roulette.losses
        },
        UPDATE_BETS (state, bets) {
            state.bets = bets
        }
    },
    actions: {
        updateState (context, roulette) {
            context.commit('UPDATE_STATE', roulette)
        },
        updateBets (context, bets) {
            context.commit('UPDATE_BETS', bets)
        }
    }
})