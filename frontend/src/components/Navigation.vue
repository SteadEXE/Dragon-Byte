<template>
    <nav class="navbar navbar-dark bg-primary fixed-bottom navbar-expand-lg">
        <div class="text-center navbar-text text-font-bold mx-auto">
            <i class="fas fa-user-circle"></i> Stead 
            <i class="fas fa-star"></i> 1,458,892 XP
        </div>
        <div class="navbar-text mr-3">
            <i class="fas fa-signal-4" v-if="ping < 50"></i>
            <i class="fas fa-signal-3" v-else-if="ping < 75"></i>
            <i class="fas fa-signal-2" v-else-if="ping < 100"></i>
            <i class="fas fa-signal-1" v-else-if="ping < 150"></i>
            <i class="fas fa-exclamation-triangle" v-else></i>

            {{ ping }} ms
        </div>
        <button class="btn btn-outline-light my-2 my-sm-0" @click="logout">
            <i class="fas fa-sign-out"></i>
        </button>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'
    import Socket from '@/Socket'

    export default {
        methods: {
            logout () {
                window.localStorage.removeItem('auth-token')
                window.location.reload()
            }
        },
        computed: mapState({
            ping: state => state.socket.ping
        })
    }
</script>
