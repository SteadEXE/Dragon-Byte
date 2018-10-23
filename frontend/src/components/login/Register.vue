<template>
    <div class="card bg-dark text-light shadow-lg">
        <div class="card-header text-center">Inscription</div>
        <div class="card-body">
            <div class="alert alert-danger" v-if="errorMessage">
                <i class="fas fa-exclamation-triangle mr-2"></i> {{ errorMessage }}
            </div>
            <div class="alert alert-success" v-if="successMessage">
                <i class="fas fa-check-circle"></i> {{ successMessage }}
            </div>
            <div v-if="!busy">
                <form @submit="register">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-user"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="Nom d'utilisateur" v-model="username">
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-key"></i>
                            </span>
                        </div>
                        <input type="password" class="form-control" placeholder="Mot de passe" v-model="password">
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-at"></i>
                            </span>
                        </div>
                        <input type="email" class="form-control" placeholder="Adresse email" v-model="email">
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" :disabled="busy">
                        Inscription
                    </button>
                </form>
            </div>
            <div class="text-center" v-else>
                <i class="fal fa-sync fa-spin my-4 loader" v-if="busy"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                username: '',
                password: '',
                email: '',
                busy: false,
                errorMessage: '',
                successMessage: ''
            }
        },
        methods: {
            async register (event) {
                event.preventDefault()

                this.busy = true
                this.errorMessage = ''
                this.successMessage = ''

                let response = await axios.post(`http://${window.location.host}/api/register`, {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })

                let data = response.data

                if (data.status === 'err') {
                    this.busy = false
                    this.errorMessage = data.message
                } else {
                    this.busy = false
                    this.successMessage = data.message
                }
            }
        }
    }
</script>

<style>
    .alert {
        font-size: 12px; 
    }

    .loader {
        font-size: 64px;
    }
</style>

