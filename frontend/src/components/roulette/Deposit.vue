<template>
    <div class="input-group">
        <div class="input-group-append">
            <span class="input-group-text bg-dark border-dark rounded-left">
                <i class="fa fa-coins"></i>
            </span>
        </div>

        <input type="text" class="form-control bg-dark text-light border-dark border-right-0" v-model="amount">

        <div class="input-group-append">
            <button class="btn btn-block text-light"
                    :class="{ 'btn-black': type === 'black', 'btn-red': type === 'red', 'btn-green': type === 'green' }"
                    :disabled="status !== 'bet'"
                    @click="deposit()">
                <i class="fas fa-arrow-circle-down mr-2"></i> GAIN <i class="fal fa-times"></i> {{ type === 'green' ? 36 : 2 }}
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Store from '@/stores/RouletteStore'
    import Socket from '@/Socket'

    export default {
        props: {
            type: String
        },
        data () {
            return {
                amount: 0
            }
        },
        mounted () {
            this.amount = window.localStorage.getItem('roulette/deposit/' + this.type) || 0
        },
        store: Store,
        computed: mapState({
            status: state => state.status,
        }),
        methods: {
            deposit () {
                this.amount = parseInt(this.amount, 10)

                if (this.amount <= 0) {
                    return
                }

                Socket.emit('roulette/deposit', {
                    type: this.type,
                    amount: this.amount
                })

                window.localStorage.setItem('roulette/deposit/' + this.type, this.amount)
            }
        }
    }
</script>

<style>
    .btn-black {
        background-color: #222222;
    }

    .btn-red {
        background-color: #e74c3c;
    }

    .btn-green {
        background-color: #2ecc71;
    }
</style>