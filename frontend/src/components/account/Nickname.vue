<template>
    <div class="card bg-dark text-light mb-4">
        <div class="card-header">Changement de surnom</div>
        <div class="card-body">
            <form @submit="submit">
                <div class="text-center" v-if="busy">
                    <i class="fal fa-sync fa-spin loader"></i>
                </div>
                <div v-else>
                    <div class="alert alert-danger" v-if="errorMessage">
                        <i class="fas fa-times-circle mr-2"></i> {{ errorMessage }}
                    </div>
                    <div class="alert alert-success" v-if="successMessage">
                        <i class="fas fa-check-circle mr-2"></i> {{ successMessage }}
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-user-tag"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="Surnom" v-model="nickname">
                    </div>
                    <div class="text-center">
                        <button class="btn btn-outline-primary">Confirmer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                nickname: '',
                errorMessage: '',
                successMessage: '',
                busy: false
            }
        },
        methods: {
            async submit (event) {
                event.preventDefault()
                
                this.busy = true
                this.successMessage = ''
                this.errorMessage = ''

                let res = await axios.post('/api/account/nickname', {
                    token: window.localStorage.getItem('auth-token'),
                    nickname: this.nickname
                })

                let data = res.data

                if (data.status === 'err') {
                    this.errorMessage = data.message
                    this.busy = false
                } else {
                    this.successMessage = data.message
                    this.busy = false
                }
            }
        }
    }
</script>
