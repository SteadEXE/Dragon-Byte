<template>
    <div class="card bg-dark text-light">
        <div class="card-header">Changement de mot de passe</div>
        <div class="card-body">
            <form @submit="submit">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-key"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" placeholder="Mot de passe" v-model="password">
                </div>

                <div class="text-center">
                    <button class="btn btn-outline-primary">Confirmer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                password: '',
                passwordConfirmation: '',
                busy: false
            }
        },
        methods: {
            submit (event) {
                event.preventDefault()
            }
        }
    }
</script>

