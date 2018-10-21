import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        state: 'idle',
        track: {
            title: '',
            duration: 0,
            elapsed: 0
        },
        owner: {
            nickname: '',
            experience: 0
        }
    },
    mutations: {
        UPDATE (state, payload) {
            if (payload.state) {
                state.state = payload.state
            }

            if (payload.track) {
                state.track = payload.track
            }

            if (payload.owner) {
                state.owner = payload.owner
            }
        }
    },
    actions: {
        update (context, state) {
            context.commit('UPDATE', state)
        }
    }
})