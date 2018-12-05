<template>
    <div class="text-center text-light">
        <p class="mb-0 text-secondary">
            JACKPOT
        </p>
        <p class="mb-0 display-4">
            <animated-number :n="jackpot"></animated-number>
        </p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Store from '@/stores/RouletteStore'
    import AnimatedNumber from '@/components/AnimatedNumber'

    export default {
        components: {
            AnimatedNumber
        },
        store: Store,
        computed: mapState({
            jackpot: state => state.jackpot
        })
    }
</script>