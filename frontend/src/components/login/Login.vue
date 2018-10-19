<template>
    <div class="card bg-dark text-light shadow-lg">
        <div class="card-header">Connexion / Inscription</div>
        <div class="card-body">
            <div class="alert alert-danger" v-if="message">
                <i class="fas fa-exclamation-triangle mr-2"></i> {{ message }}
            </div>
            <form @submit="submit">
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
                    <input type="text" class="form-control" placeholder="Email (inscription)" v-model="email">
                </div>

                <button type="submit" class="btn btn-primary btn-block" :disabled="busy">
                    <i class="fal fa-sync fa-spin mr-2" v-if="busy"></i>
                    Connexion
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import Socket from '@/Socket'

    export default {
        data () {
            return {
                username: '',
                password: '',
                email: '',
                busy: false,
                message: '',
                socket: Socket.getInstance()
            }
        },
        methods: {
            submit (event) {
                event.preventDefault()

                this.busy = true
                this.message = ''

                this.socket.emit('authentificate', this.username, this.password, this.email)
            }
        }
    }
</script>

<style>
    .alert {
        font-size: 12px; 
    }
</style>

