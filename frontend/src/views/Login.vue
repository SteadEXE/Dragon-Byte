<template>
    <div>
        <div class="row pt-4" v-if="authentified">
            <div class="col-4 offset-4">
                <login></login>
            </div>
        </div>
        <div class="row pt-4" v-else>
            <div class="col-3 offset-3">
                <login></login>
            </div>
            <div class="col-3">
                <register></register>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from '@/components/login/Login'
    import Register from '@/components/login/Register'

    export default {
        components: {
            login: Login,
            register: Register
        },
        data () {
            return {
                authentified: window.localStorage.getItem('auth-token') !== null
            }
        }
    }
</script>

