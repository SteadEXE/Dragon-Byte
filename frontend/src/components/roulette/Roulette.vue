<template>
    <canvas id="roulette"></canvas>
</template>

<script>
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
        red: '#ff0000',
        black: '#000000',
        green: '#00ff00'
    }

    const SLOT_WIDHT = 100
    const SLOT_HEIGHT = 100

    export default {
        data () {
            return {
                canvas: null,
                ctx: null
            }
        },
        mounted () {
            this.canvas = document.querySelector('#roulette')
            this.ctx = this.canvas.getContext('2d')
            this.render()
        },
        methods: {
            render () {
                // Ensure that canvas size matches the real size.
                this.canvas.width = this.canvas.clientWidth
                this.canvas.height = this.canvas.clientHeight

                for (let i = 0; i < SLOTS.length; i++) {
                    this.ctx.fillStyle = COLORS[SLOTS[i].color]
                    this.ctx.fillRect(i * SLOT_WIDHT, 0, SLOT_WIDHT, SLOT_HEIGHT)
                }
            }
        }
    }
</script>

<style>
    #roulette {
        width: 100%;
        height: 400px;
        background: white;
    }
</style>