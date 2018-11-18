<template>
    <canvas id="roulette" width="1500px" height="250px"></canvas>
</template>

<script>
    import '@/assets/webfonts/roboto/roboto.css'
    import { mapState } from 'vuex'
    import Socket from '@/Socket'
    import Store from '@/stores/RouletteStore'

    const SLOTS = [
        { value: 0, color: 'green' },
        { value: 32, color: 'red' },
        { value: 15, color: 'black' },
        { value: 19, color: 'red' },
        { value: 4, color: 'black' },
        { value: 21, color: 'red' },
        { value: 2, color: 'black' },
        { value: 25, color: 'red' },
        { value: 17, color: 'black' },
        { value: 34, color: 'red' },
        { value: 6, color: 'black' },
        { value: 27, color: 'red' },
        { value: 13, color: 'black' },
        { value: 36, color: 'red' },
        { value: 11, color: 'black' },
        { value: 30, color: 'red' },
        { value: 8, color: 'black' },
        { value: 23, color: 'red' },
        { value: 10, color: 'black' },
        { value: 5, color: 'red' },
        { value: 24, color: 'black' },
        { value: 16, color: 'red' },
        { value: 33, color: 'black' },
        { value: 1, color: 'red' },
        { value: 20, color: 'black' },
        { value: 14, color: 'red' },
        { value: 31, color: 'black' },
        { value: 9, color: 'red' },
        { value: 22, color: 'black' },
        { value: 18, color: 'red' },
        { value: 29, color: 'black' },
        { value: 7, color: 'red' },
        { value: 28, color: 'black' },
        { value: 12, color: 'red' },
        { value: 35, color: 'black' },
        { value: 3, color: 'red' },
        { value: 26, color: 'black' }
    ]

    const COLORS = {
        red: '#e74c3c',
        black: '#222222',
        green: '#2ecc71'
    }

    export default {
        store: Store,
        data () {
            return {
                ctx: null,
                canvas: null
            }
        },
        computed: mapState({
            offset: state => state.offset,
            end: state => state.end,
            status: state => state.status
        }),
        mounted () {
            this.init()

            Socket.emit('roulette/join')
        },
        destroyed () {
            Socket.emit('roulette/leave')
        },
        methods: {
            init () {
                this.canvas = document.querySelector('#roulette')
                this.ctx = this.canvas.getContext('2d')

                this.draw()
            },
            draw () {
                // Clean canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

                // Draw roulette.
                let arc = (2 * Math.PI) / SLOTS.length
                let radius = 1e3

                let centerWheelX = this.canvas.width / 2
                let centerWheelY = this.canvas.height + radius - 200

                let offset = this.offset

                if (Date.now() < this.end && this.status === 'spinning') {
                    let remaining = 1 - (this.end - Date.now()) / 15e3
                    offset = this.offset * this.easeOutQuad(remaining)
                }

                offset -= Math.PI / 2

                for (let i = 0; i < SLOTS.length; i++) {
                    let angle = (arc * i) + offset

                    this.ctx.beginPath()
                    this.ctx.fillStyle = COLORS[SLOTS[i].color]
                    this.ctx.arc(centerWheelX, centerWheelY, radius, angle, angle + arc, false)
                    this.ctx.arc(centerWheelX, centerWheelY, radius - 100, angle + arc, angle, true)
                    this.ctx.fill()
                    this.ctx.stroke()
                }

                for (let i = 0; i < SLOTS.length; i++) {
                    this.ctx.save()
                    let angle = (arc * i) + offset - (arc / 2) + Math.PI / 2
                    let x = (radius - 60) * Math.cos(arc * i + offset - (arc / 2) + arc)
                    let y = (radius - 60) * Math.sin(arc * i + offset - (arc / 2) + arc)
                    this.ctx.translate(centerWheelX + x, centerWheelY + y)
                    this.ctx.rotate(angle + arc)
                    this.ctx.textAlign = 'center'
                    this.ctx.fillStyle = '#ffffff'
                    this.ctx.font = '32px Arial'
                    this.ctx.fillText(SLOTS[i].value, 0, 0)
                    this.ctx.restore()
                }

                this.ctx.save()

                // Draw triangle
                this.ctx.beginPath()
                this.ctx.moveTo(this.canvas.width / 2 - 10, this.canvas.height - 210)
                this.ctx.lineTo(this.canvas.width / 2 + 10, this.canvas.height - 210)
                this.ctx.lineTo(this.canvas.width / 2, this.canvas.height - 190)
                this.ctx.lineTo(this.canvas.width / 2 - 10, this.canvas.height - 210)
                this.ctx.fillStyle = "#8e44ad"
                this.ctx.fill()
                this.ctx.stroke()

                this.ctx.restore()

                // Draw time remaining
                if (this.status === 'bet') {
                    let remaining = Math.abs(Date.now() - this.end) / 1000

                    this.ctx.save()
                    this.ctx.textAlign = 'center'
                    this.ctx.font = 'lighter 16px roboto'
                    this.ctx.fillStyle = '#ffffff'
                    this.ctx.fillText('Prochain tirage dans', this.canvas.width / 2, this.canvas.height - 60)
                    this.ctx.font = 'lighter 48px roboto'
                    this.ctx.fillText(remaining.toFixed(1) + "'", this.canvas.width / 2, this.canvas.height - 10)
                    this.ctx.restore()
                }

                requestAnimationFrame(this.draw)
            },
            easeOutQuad (t) {
                //return t * (2 - t)
                return t<.5 ? 2*t*t : -1+(4-2*t)*t
            }
        }
    }

    Socket.on('roulette/status', state => {
        console.log('Received state')
        Store.dispatch('updateState', state)

        console.log(state)
    })
</script>

<style>
    .slot {
        width: 100%;
        height: 100%;
    }
</style>