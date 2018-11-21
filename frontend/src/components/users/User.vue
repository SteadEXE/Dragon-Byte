<template>
    <div class="card bg-dark rounded-0 online">
        <div class="card-header py-2 font-weight-bold text-light">
            <i class="fas fa-user-circle mr-2"></i> {{ user.nickname }}
            <span class="text-primary">
                <i class="fas fa-star mx-2"></i> <animated-number :n="user.experience"></animated-number>
            </span>
        </div>
    </div>
</template>

<script>
    import AnimatedNumber from '@/components/AnimatedNumber'

    export default {
        components: {
            animatedNumber: AnimatedNumber
        },
        props: {
            user: Object
        }
    }
</script>

<style>
    .online {
        font-size: 14px;
    }
</style>

