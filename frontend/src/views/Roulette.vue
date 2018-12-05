<template>
    <div>
        <jackpot></jackpot>
        <roulette></roulette>
        <bets></bets>
    </div>
</template>

<script>
    import Roulette from '@/components/roulette/Roulette'
    import Bets from '@/components/roulette/Bets'
    import Deposit from '@/components/roulette/Deposit'
    import Jackpot from '@/components/roulette/Jackpot'

    export default {
        components: {
            roulette: Roulette,
            bets: Bets,
            deposit: Deposit,
            jackpot: Jackpot
        }
    }
</script>