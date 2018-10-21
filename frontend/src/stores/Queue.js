import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pendings: [ ]
    },
    mutations: {
        SET_PENDINGS (state, pendings) {
            state.pendings = pendings
        }
    },
    actions: {
        SET_PENDINGS (context, pendings) {
            context.commit('SET_PENDINGS', pendings)
        }
    }
})