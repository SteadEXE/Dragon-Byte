<template>
    <div class="card bg-dark text-light shadow-lg">
        <div class="card-header text-center text-uppercase">Historique</div>
        <div class="card-body p-0">
            <entry v-for="(item, index) in tracks" :entry="item" :key="index"></entry>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Entry from './Entry'
    import Store from '@/stores/History'
    import Socket  from '@/Socket'

    export default {
        components: { entry: Entry },
        store: Store,
        computed: mapState({
            tracks: state => state.tracks
        })
    }

    Socket.on('history/tracks', tracks => {
        Store.dispatch('SET_TRACKS', tracks)
    })
</script>
