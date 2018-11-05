import Vue from 'vue'
import Router from 'vue-router'

import Player from '@/views/Player'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Player, name: 'home' },
    { path: '/account', component: () => import('@/views/Account'), name: 'account' },
    { path: '/map', component: () => import('@/views/Map'), name: 'map' }
  ]
})
