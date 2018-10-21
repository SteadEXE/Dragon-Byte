import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tracks: [ ]
    },
    mutations: {
        SET_TRACKS (state, tracks) {
            state.tracks = tracks
        }
    },
    actions: {
        SET_TRACKS (context, tracks) {
            context.commit('SET_TRACKS', tracks)
        }
    }
})