<template>
    <div>
        <jackpot></jackpot>
        <roulette></roulette>
        <history></history>
        <bets></bets>
    </div>
</template>

<script>
    import Roulette from '@/components/roulette/Roulette'
    import Bets from '@/components/roulette/Bets'
    import Deposit from '@/components/roulette/Deposit'
    import Jackpot from '@/components/roulette/Jackpot'
    import History from '@/components/roulette/History'

    export default {
        components: {
            roulette: Roulette,
            bets: Bets,
            deposit: Deposit,
            jackpot: Jackpot,
            history: History
        }
    }
</script>