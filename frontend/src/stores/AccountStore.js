import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        authentified: false
    },
    mutations: {
        AUTHENTIFICATE (state) {
            state.authentified = true
        }
    },
    actions: {
        authentificate (context) {
            context.commit('AUTHENTIFICATE')
        }
    }
}