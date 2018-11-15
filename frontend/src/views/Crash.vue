<template>
    <div class="text-primary">
        {{ data.toFixed(2) }}
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: 0
            }
        },
        mounted () {
            let started = Date.now()

            setInterval (() => {
                this.data = this.getCrashMultiplier(Date.now() - started)
            })
        },
        methods: {
            getCrashDuration (n) {
                return 5e4 * Math.log(n) / 3
            },
            getCrashMultiplier (n) {
                return Math.exp (6e-5 * n)
            }
        }
    }
</script>