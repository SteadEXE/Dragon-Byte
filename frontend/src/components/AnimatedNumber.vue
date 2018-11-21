<template>
    <span>{{ displayNumber.toLocaleString() }}</span>
</template>

<script>
    export default {
        props: {
            n: { type: Number, default: 0 }
        },
        data () {
            return {
                displayNumber: 0
            }
        },
        mounted () {
            this.increment()
        },
        watch: {
            number: function () {
                this.increment()
            }
        },
        methods: {
            increment () {
                if (this.number === this.displayNumber) {
                    return
                }

                if (this.displayNumber !== this.n) {
                    let change = (this.n - this.displayNumber) / 10
                    change = change >= 0 ? Math.ceil(change) : Math.floor(change)
                    this.displayNumber = this.displayNumber + change
                }

                requestAnimationFrame(this.increment)
            }
        }
    }
</script>