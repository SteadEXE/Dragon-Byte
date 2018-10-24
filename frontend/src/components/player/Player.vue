<template>
    <div>
        <div class="card bg-dark text-light shadow-lg">
            <div class="card-header text-center text-uppercase">
                <span v-if="state === 'idle'">EN ATTENTE</span>
                <span v-if="state === 'loading'">CHARGEMENT</span>
                <span v-if="state === 'playing'">LECTURE EN COURS</span>
            </div>
            <div class="card-body text-center">
                <div v-if="state === 'loading'">
                    <i class="fas fa-cog fa-spin" id="loader"></i>
                </div>
                <div v-else-if="state === 'playing'">
                    <p class="lead">
                        {{ track.title }}
                    </p>
                    <div class="text-primary mb-3">
                        <i class="fas fa-clock mr-2"></i> {{ track.elapsed }} / {{ track.duration }}
                        <i class="fas fa-user-circle mx-2"></i> {{ owner.nickname }}
                    </div>
                    <button class="btn btn-outline-danger" @click="next">
                        <i class="fas fa-step-forward"></i> SUIVANT
                    </button>
                </div>
                <div v-else>
                    Il n'y a aucun titre dans la file d'attente.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Store from '@/stores/PlayerStore'
    import Socket from '@/Socket'

    export default {
        store: Store,
        computed: mapState({
            state: state => state.state,
            track: state => state.track,
            owner: state => state.owner
        }),
        methods: {
            next () {
                Socket.emit('player/next')
            }
        }
    }

    Socket.on('player/status', payload => {
        Store.dispatch('update', payload)
    })
</script>

<style>
    #loader {
        font-size: 64px;
    }
</style>

