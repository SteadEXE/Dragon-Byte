<template>
    <div>
        <div class="row pt-4">
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
        }
    }
</script>

