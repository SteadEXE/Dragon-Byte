<template>
    <div>
        <div class="card bg-dark text-light shadow-lg mb-4">
            <div class="card-header">Envoyer une vidéo</div>
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
        <div class="card bg-dark text-light shadow-lg">
            <div class="card-header">File d'attente</div>
            <div class="card-body">
                
            </div>
        </div>
    </div>
</template>

<script>
    import Entry from './Entry'
    import Socket from '@/Socket'

    export default {
        components: { 
            entry: Entry
        },
        data () {
            return {
                url: '',
                entries: [ ],
                socket: Socket.getInstance()
            }
        },
        methods: {
            push (event) {
                event.preventDefault()

                this.socket.emit('queue.push', this.url)

                this.url = url
            }
        }
    }
</script>
