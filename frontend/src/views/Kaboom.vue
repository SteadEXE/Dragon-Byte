<template>
    <kaboom></kaboom>
</template>

<script>
    import Socket from '@/Socket'
    import Kaboom from '@/components/kaboom/Kaboom'

    export default {
        components: {
            kaboom: Kaboom
        },
        mounted () {
            Socket.emit('kaboom/join')
        },
        destroyed () {
            Socket.emit('kaboom/left')
        }
    }
</script>