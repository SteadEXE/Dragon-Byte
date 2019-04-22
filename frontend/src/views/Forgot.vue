<template>
    <div class="row pt-4">
        <div class="col-sm-6 offset-sm-3">
            <div class="card bg-dark text-light shadow-lg">
                <div class="card-header text-center">Mot de passe oublié</div>
                <div class="card-body">
                    <div class="alert alert-danger" v-if="errorMessage">
                        <i class="fas fa-exclamation-triangle mr-2"></i> {{ errorMessage }}
                    </div>
                    <div class="alert alert-success" v-if="successMessage">
                        <i class="fas fa-check-circle mr-2"></i> {{ successMessage }}
                    </div>
                    <div v-if="!busy">
                        <form @submit="submit">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="fas fa-at"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" placeholder="Adresse email" v-model="email">
                            </div>

                            <button type="submit" class="btn btn-primary btn-block" :disabled="busy">
                                Envoyer un nouveau mot de passe
                            </button>
                        </form>
                    </div>
                    <div class="text-center" v-else>
                        <i class="fal fa-sync fa-spin my-4 loader" v-if="busy"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                busy: false,
                email: '',
                errorMessage: '',
                successMessage: ''
            }
        },
        methods: {
            async submit () {
                this.busy = true
                this.errorMessage = ''
                this.successMessage = ''

                let response = await axios.post('/api/reset-password', { email: this.email })

                let data = response.data

                if (data.status === 'err') {
                    this.busy = false
                    this.errorMessage = data.message
                    return
                }

                this.successMessage = data.message
                this.busy = false
            }
        }
    }
</script>