<template>
    <div>
        <div class="row my-2">
            <div class="col-sm-4 text-center">
                <div class="input-group">
                    <div class="input-group-append">
                        <span class="input-group-text bg-dark border-dark rounded-left">
                            <i class="fa fa-coins"></i>
                        </span>
                    </div>

                    <input type="text" class="form-control bg-dark text-light border-dark border-right-0" v-model="amount['black']">

                    <div class="input-group-append">
                        <button class="btn btn-black btn-block text-light" @click="deposit('black')" :disabled="status !== 'bet'">
                            <i class="fas fa-arrow-circle-down mr-2"></i> GAIN <i class="fal fa-times"></i> 2
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="input-group">
                    <div class="input-group-append">
                        <span class="input-group-text bg-dark border-dark rounded-left">
                            <i class="fa fa-coins"></i>
                        </span>
                    </div>

                    <input type="text" class="form-control bg-dark text-light border-dark border-right-0" v-model="amount['red']">

                    <div class="input-group-append">
                        <button class="btn btn-red btn-block text-light" @click="deposit('red')" :disabled="status !== 'bet'">
                            <i class="fas fa-arrow-circle-down mr-2"></i> GAIN <i class="fal fa-times"></i> 2
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="input-group">
                    <div class="input-group-append">
                        <span class="input-group-text bg-dark border-dark rounded-left">
                            <i class="fa fa-coins"></i>
                        </span>
                    </div>

                    <input type="text" class="form-control bg-dark text-light border-dark border-right-0" v-model="amount['green']">

                    <div class="input-group-append">
                        <button class="btn btn-green btn-block text-light" @click="deposit('green')" :disabled="status !== 'bet'">
                            <i class="fas fa-arrow-circle-down mr-2"></i> GAIN <i class="fal fa-times"></i> 36
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Store from '@/stores/RouletteStore'
    import Socket from '@/Socket'

    export default {
        data () {
            return {
                amount: {
                    green: 0,
                    black: 0,
                    red: 0
                }
            }
        },
        store: Store,
        computed: mapState({
            status: state => state.status,
        }),
        methods: {
            deposit (type) {
                if (this.amount <= 0) {
                    return
                }

                Socket.emit('roulette/deposit', {
                    type: type,
                    amount: this.amount[type]
                })
            }
        }
    }
</script>

<style>
    .deposit {
        width: 600px;
    }

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