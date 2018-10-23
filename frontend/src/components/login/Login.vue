<template>
    <div class="card bg-dark text-light shadow-lg">
        <div class="card-header text-center">Connexion</div>
        <div class="card-body">
            <div class="alert alert-danger" v-if="message">
                <i class="fas fa-exclamation-triangle mr-2"></i> {{ message }}
            </div>
            <div v-if="!busy">
                <form @submit="auth">
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

                    <button type="submit" class="btn btn-primary btn-block" :disabled="busy">
                        Connexion
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
    import Socket from '@/Socket'

    export default {
        data () {
            return {
                username: '',
                password: '',
                busy: false,
                message: ''
            }
        },
        beforeMount () {
            const token = window.localStorage.getItem('auth-token')

            if (token !== null) {
                this.busy = true
                this.connect(token)
            }
        },
        methods: {
            async auth (event) {
                event.preventDefault()

                this.busy = true
                this.message = ''

                let response = await axios.post('http://localhost:8000/api/auth', {
                    username: this.username,
                    password: this.password
                })

                let data = response.data

                if (data.status === 'err') {
                    this.busy = false
                    this.message = data.message
                    return
                }

                const token = data.content.account.token
                
                window.localStorage.setItem('auth-token', token)
                
                this.connect(token)
            },
            connect (token) {
                Socket.once('connect', () => {
                    this.$store.dispatch('account/authenticate')
                })

                Socket.io.opts.query = { token }
                Socket.connect()
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

