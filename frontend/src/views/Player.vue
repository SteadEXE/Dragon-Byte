<template>
    <div>
        <div class="row">
            <div class="col-4">
                <queue></queue>
            </div>
            <div class="col-4">
                <player></player>
                <online></online>
            </div>
            <div class="col-4">
                <history></history>
            </div>
        </div>
    </div>
</template>

<script>
    import Player from '@/components/player/Player'
    import Queue from '@/components/player/Queue'
    import History from '@/components/player/History'
    import Online from '@/components/users/Online'

    export default {
        components: {
            player: Player,
            queue: Queue,
            history: History,
            online: Online
        }
    }
</script>
