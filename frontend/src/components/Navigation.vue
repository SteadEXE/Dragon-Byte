<template>
    <nav class="navbar navbar-dark bg-primary fixed-bottom navbar-expand-lg">
        <div class="text-center mx-auto">
            
        </div>
        <button class="btn btn-outline-light my-2 my-sm-0" @click="logout">
            <i class="fas fa-sign-out"></i>
        </button>
    </nav>
</template>

<script>
    import Socket from '@/Socket'

    export default {
        methods: {
            logout () {
                window.localStorage.removeItem('auth-token')
                window.location.reload()
            }
        }
    }
</script>
