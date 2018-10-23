import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        authentified: false,
        account: null,
    },
    mutations: {
        AUTHENTICATE (state) {
            state.authentified = true
        }
    },
    actions: {
        authenticate (context, token) {
            context.commit('AUTHENTICATE')
        }
    }
}