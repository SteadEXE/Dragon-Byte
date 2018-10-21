<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
            <div class="collapse navbar-collapse" v-if="state != 'idle'">
                <span class="navbar-text text-white mr-3 badge badge-primary">
                    <i class="fal fa-spinner fa-spin mr-1" v-if="state == 'loading'"></i> {{ track.elapsed }} / {{ track.duration }}
                </span>
                <span class="navbar-text text-white mr-3">
                    {{ track.title }}
                </span>
                <button class="btn btn-outline-primary mr-3">
                    <i class="fas fa-step-forward"></i>
                </button>
                <span class="navbar-text text-white mr-3">
                    {{ owner.nickname }} <i class="fas fa-trophy-alt mx-1"></i> {{ owner.experience }}
                </span>
            </div>
        </nav>
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
        })
    }

    const socket = Socket.getInstance()

    socket.on('player/status', payload => {
        Store.dispatch('update', payload)
    })
</script>

