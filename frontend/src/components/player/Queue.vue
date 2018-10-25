<template>
    <div>
        <div class="card bg-dark text-light shadow-lg mb-4">
            <div class="card-header text-center text-uppercase">Envoyer une vidéo</div>
            <div class="card-body">
                <form @submit="push">
                    <div class="input-group">
                        <input type="text" class="form-control bg-dark text-primary border-primary border-right-0" placeholder="Lien de la vidéo" v-model="url">
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary">
                                <i class="fas fa-cloud-upload"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card bg-dark text-light shadow-lg" v-if="pendings.length > 0">
            <div class="card-header text-center text-uppercase">File d'attente</div>
            <div class="card-body p-0">
                <entry v-for="(item, index) in pendings" :entry="item" :key="index"></entry>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Entry from './Entry'
    import Socket from '@/Socket'
    import Store from '@/stores/Queue'

    export default {
        components: { 
            entry: Entry
        },
        data () {
            return {
                url: ''
            }
        },
        store: Store,
        computed: mapState({
            pendings: state => state.pendings
        }),
        methods: {
            push (event) {
                event.preventDefault()

                Socket.emit('queue/push', this.url)

                this.url = ''
            }
        }
    }

    Socket.on('queue/all', pendings => {
        Store.dispatch('SET_PENDINGS', pendings)
    })
</script>
