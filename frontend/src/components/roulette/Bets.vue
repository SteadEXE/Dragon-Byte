<template>
    <div class="row">
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-black">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['black']" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td>{{ bet.amount }}</td>
                        <td>
                            <span v-if="bet.gain > 0">+ {{ bet.gain }}</span>
                            <span v-if="bet.gain < 0">- {{ bet.gain }}</span>
                            <span v-if="bet.gain === 0">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-red">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['red']" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td>{{ bet.amount }}</td>
                        <td>
                            <span v-if="bet.gain > 0">+ {{ bet.gain }}</span>
                            <span v-if="bet.gain < 0">- {{ bet.gain }}</span>
                            <span v-if="bet.gain === 0">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 text-light">
            <table class="table table-dark">
                <thead class="bg-green">
                    <tr>
                        <th><i class="fas fa-user-circle mr-2"></i> Utilisateur</th>
                        <th><i class="fas fa-coins mr-2"></i> Pari</th>
                        <th><i class="fas fa-chart-line mr-2"></i> Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bet in bets['green']" :class="{ 'text-success': bet.gain > 0, 'text-danger': bet.gain < 0 }">
                        <td>{{ bet.user.nickname }}</td>
                        <td>{{ bet.amount }}</td>
                        <td>
                            <span v-if="bet.gain > 0">+ {{ bet.gain }}</span>
                            <span v-if="bet.gain < 0">- {{ bet.gain }}</span>
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

    export default {
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