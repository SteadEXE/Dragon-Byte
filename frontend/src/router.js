import Vue from 'vue'
import Router from 'vue-router'

import Player from '@/views/Player'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Player, name: 'home' },
        { path: '/account', component: () => import('@/views/Account'), name: 'account' },
        { path: '/map', component: () => import('@/views/Map'), name: 'map' },
        { path: '/roulette', component: () => import('@/views/Roulette'), name: 'roulette' },
        { path: '/crash', component: () => import('@/views/Crash'), name: 'crash' }
    ]
})
