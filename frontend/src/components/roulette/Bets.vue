<template>
    <div class="row">
        <div class="col-sm-4 text-light">
            <deposit type="black" class="mb-2"></deposit>

            <table class="table table-dark">
                <thead class="bg-black">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['black']" :key="bet" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td><animated-number :n="bet.amount"></animated-number></td>
                        <td>
                            <span v-if="bet.gain > 0">+ <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain < 0">- <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain === 0">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <deposit type="red" class="mb-2"></deposit>

            <table class="table table-dark">
                <thead class="bg-red">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['red']" :key="bet" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td><animated-number :n="bet.amount"></animated-number></td>
                        <td>
                            <span v-if="bet.gain > 0">+ <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain < 0">- <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain === 0">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <deposit type="green" class="mb-2"></deposit>

            <table class="table table-dark">
                <thead class="bg-green">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['green']" :key="bet" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td><animated-number :n="bet.amount"></animated-number></td>
                        <td>
                            <span v-if="bet.gain > 0">+ <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain < 0">- <animated-number :n="Math.abs(bet.gain)"></animated-number></span>
                            <span v-if="bet.gain === 0">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Socket from '@/Socket'
    import Store from '@/stores/RouletteStore'
    import AnimatedNumber from '@/components/AnimatedNumber'
    import Deposit from '@/components/roulette/Deposit'

    export default {
        components: {
            animatedNumber: AnimatedNumber,
            deposit: Deposit
        },
        store: Store,
        computed: mapState({
            bets: state => state.bets
        })
    }

    Socket.on('roulette/bets', bets => {
        Store.dispatch('updateBets', bets)
    })
</script>

<style>
    .bg-red {
        background: #e74c3c;
    }

    .bg-black {
        background: #222222;
    }

    .bg-green {
        background: #2ecc71;
    }
</style>