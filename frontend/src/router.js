import Vue from 'vue'
import Router from 'vue-router'

import Player from '@/views/Player'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: Player,
            meta: {
                auth: true
            }
        },
        {
            name: 'account',
            path: '/account',
            component: () => import('@/views/Account'),
            meta: {
                auth: true
            }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/Login')
        },
        {
            name: 'map',
            path: '/map',
            component: () => import('@/views/Map'),
            meta: {
                auth: true
            }
        },
        {
            name: 'roulette',
            path: '/roulette',
            component: () => import('@/views/Roulette'),
            meta: {
                auth: true
            }
        },
        {
            name: 'crash',
            path: '/crash',
            component: () => import('@/views/Crash'),
            meta: {
                auth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    // If route requires user to be auth.
    if (to.matched.some(record => record.meta.auth)) {
        // If no auth token redirect user to auth page.
        if (window.localStorage.getItem('auth-token') === null) {
            next({ name: 'login' })
            return
        }
    }

    next()
})

export default router
