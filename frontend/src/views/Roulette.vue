<template>
    <div>
        <roulette></roulette>
        <bets></bets>
    </div>
</template>

<script>
    import Roulette from '@/components/roulette/Roulette'
    import Bets from '@/components/roulette/Bets'

    export default {
        components: {
            roulette: Roulette,
            bets: Bets
        }
    }
</script>