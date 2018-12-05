<template>
    <div class="row pt-4">
        <div class="col-sm-4 offset-sm-4">
            <div class="card bg-dark text-light shadow-lg">
                <div class="card-header text-center">Mot de passe oublié</div>
                <div class="card-body">
                    <div class="alert alert-danger" v-if="message">
                        <i class="fas fa-exclamation-triangle mr-2"></i> {{ message }}
                    </div>
                    <div v-if="!busy">
                        <form @submit="auth">
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
    export default {
        data () {
            return {
                busy: false,
                email: '',
                message: ''
            }
        }
    }
</script>