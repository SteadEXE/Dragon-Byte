<template>
    <nav class="navbar navbar-dark bg-primary fixed-bottom navbar-expand-lg">
        <router-link class="btn btn-outline-light my-2 my-sm-0 mr-2" :to="{ name: 'home' }">
            <i class="fas fa-home"></i>
        </router-link>
        <div class="text-center navbar-text text-font-bold mx-auto">
            <div v-if="account">
                <i class="fas fa-user-circle mr-2"></i> {{ account.nickname }}
                <i class="fas fa-star mx-2"></i> <animated-number :n="account.experience"></animated-number> XP
                <i class="fas fa-coins mx-2"></i> <animated-number :n="account.points"></animated-number>
            </div>
        </div>
        <router-link class="btn btn-outline-light my-2 my-sm-0 mr-2" :to="{ name: 'account' }">
            <i class="fas fa-cog"></i>
        </router-link>
        <button class="btn btn-danger my-2 my-sm-0" @click="logout">
            <i class="fas fa-sign-out"></i>
        </button>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'
    import AnimatedNumber from '@/components/AnimatedNumber'

    export default {
        components: {
            animatedNumber: AnimatedNumber
        },
        methods: {
            logout () {
                window.localStorage.removeItem('auth-token')
                window.location.reload()
            }
        },
        computed: mapState({
            ping: state => state.socket.ping,
            account: state => state.account.account
        })
    }
</script>
