<template>
    <nav class="navbar navbar-dark bg-primary fixed-top navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{ name: 'home' }" class="nav-link">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'roulette' }" class="nav-link">Roulette</router-link>
                </li>
            </ul>
        </div>
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
