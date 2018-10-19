import Vue from 'vue'
import Vuex from 'vuex'
import SocketStore from '@/stores/SocketStore'
import AccountStore from '@/stores/AccountStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        socket: SocketStore,
        account: AccountStore
    }
})