<template>
    <canvas id="kaboom"></canvas>
</template>

<script>
    import { mapState } from 'vuex'
    import Socket from '@/Socket'
    import KaboomStore from '@/stores/KaboomStore'

    export default {
        store: KaboomStore,
        data () {
            return {
                canvas: null,
                ctx: null
            }
        },
        computed: mapState({
            players: state => state.players,
            status: state => state.status
        }),
        mounted () {
            window.addEventListener('resize', this.resizeCanvas)

            this.init()
        },
        destroyed () {
            window.removeEventListener('resize', this.resizeCanvas)
        },
        methods: {
            init () {
                this.canvas = document.querySelector('#kaboom')
                this.ctx = this.canvas.getContext('2d')

                this.resizeCanvas()
                this.draw()
            },
            draw () {
                const centerX = this.canvas.width / 2
                const centerY = this.canvas.height / 2

                

                requestAnimationFrame(this.draw)
            },
            resizeCanvas () {
                this.canvas.width = this.canvas.clientWidth
                this.canvas.height = this.canvas.clientHeight
            }
        }
    }

    Socket.on('kaboom/players', players => {
        KaboomStore.dispatch('updatePlayers', players)
    })
</script>
