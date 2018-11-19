<template>
    <div>
        <div class="deposit mx-auto my-2">
            <div class="input-group">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-danger" @click="increase(-1000)">- 1000</button>
                    <button class="btn btn-outline-danger" @click="increase(-100)">- 100</button>
                    <button class="btn btn-outline-danger" @click="increase(-10)">- 10</button>
                </div>
                <input type="number" class="form-control bg-dark text-primary border-primary" v-model="amount">
                <div class="input-group-append">
                    <button class="btn btn-outline-success" @click="increase(10)">+ 10</button>
                    <button class="btn btn-outline-success" @click="increase(100)">+ 100</button>
                    <button class="btn btn-outline-success" @click="increase(1000)">+ 1000</button>
                </div>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-sm-4 text-center">
                <button class="btn btn-black btn-block text-light" @click="deposit('black')">
                    <i class="fas fa-arrow-circle-down"></i>
                </button>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-red btn-block text-light" @click="deposit('red')">
                    <i class="fas fa-arrow-circle-down"></i>
                </button>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-green btn-block text-light" @click="deposit('green')">
                    <i class="fas fa-arrow-circle-down"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Socket from '@/Socket'

    export default {
        data () {
            return {
                amount: 0
            }
        },
        methods: {
            deposit (type) {
                if (this.amount <= 0) {
                    return
                }

                Socket.emit('roulette/deposit', {
                    type: type,
                    amount: this.amount
                })
            },
            increase (n) {
                if (this.amount + n < 0) {
                    return
                }

                this.amount = parseInt(this.amount, 10) + parseInt(n, 10)
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