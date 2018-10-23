import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        onlines: [ ]
    },
    mutations: {
        ONLINES (state, users) {
            state.onlines = users
        }
    },
    actions: {
        onlines (context, users) {
            context.commit('ONLINES', users)
        }
    }
})