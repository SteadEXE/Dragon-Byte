<template>
    <div>
        <div class="row pt-4">
            <div class="col-4 offset-4">
                <login></login>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from '@/components/login/Login'

    export default {
        components: {
            login: Login
        }
    }
</script>

