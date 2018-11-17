<template>
    <canvas id="crash" width="500px" height="300px"></canvas>
</template>

<script>
    export default {
        data () {
            return {
                ctx: null,
                data: 0,
                elapsed: 0
            }
        },
        mounted () {
            let started = Date.now()

            this.ctx = document.querySelector('#crash').getContext('2d')

            setInterval (() => {
                this.data = this.getCrashMultiplier(Date.now() - started)
                this.draw()

                this.elapsed += 10
            }, 10)
        },
        methods: {
            getCrashDuration (n) {
                return 5e4 * Math.log(n) / 3
            },
            getCrashMultiplier (n) {
                return Math.exp (6e-5 * n)
            },
            draw () {
                this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height)
                this.ctx.beginPath()
                this.ctx.moveTo(0, this.ctx.height)
            }
        }
    }
</script>

<style>
    #crash {
        background: white;
    }
</style>