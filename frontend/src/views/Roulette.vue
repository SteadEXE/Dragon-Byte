<template>
    <div>
        <roulette></roulette>
        <bets></bets>
    </div>
</template>

<script>
    import Roulette from '@/components/roulette/Roulette'
    import Bets from '@/components/roulette/Bets'
    import Deposit from '@/components/roulette/Deposit'

    export default {
        components: {
            roulette: Roulette,
            bets: Bets,
            deposit: Deposit
        }
    }
</script>