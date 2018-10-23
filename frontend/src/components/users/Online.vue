<template>
    <div class="card bg-dark shadow-lg my-4">
        <div class="card-header text-light text-uppercase text-center">Utilisateurs en ligne</div>
        <div class="card-body p-0">
            <user v-for="(user, index) in onlines" :key="index" :user="user"></user>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Socket from '@/Socket'
    import Store from '@/stores/Users'
    import User from './User'

    export default {
        store: Store,
        computed: mapState({
            onlines: state => state.onlines
        }),
        components: {
            user: User
        }
    }

    Socket.on('users/online', users => {
        Store.dispatch('onlines', users)
    })
</script>
