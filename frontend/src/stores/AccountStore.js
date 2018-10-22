import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        authentified: false,
        account: null
    },
    mutations: {
        AUTHENTIFICATE (state) {
            state.authentified = true
        }
    },
    actions: {
        authentificate (context, token) {
            context.commit('AUTHENTIFICATE')
        }
    }
}