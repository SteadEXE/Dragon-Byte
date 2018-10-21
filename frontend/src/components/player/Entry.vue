<template>
    <div class="card bg-dark rounded-0 entry">
        <div class="card-header"><i class="fas fa-music mr-2"></i> {{ entry.track.title }}</div>
        <div class="card-body text-grey">
            <i class="fas fa-user-circle mr-2"></i> {{ entry.owner.nickname }}
            <i class="fas fa-play-circle mx-2"></i> {{ entry.track.played }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            entry: Object
        }
    }
</script>

<style>
    .entry {
        font-size: 12px;
    }
</style>
