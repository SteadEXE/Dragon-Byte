<template>
    <div class="card bg-dark rounded-0 entry">
        <div class="card-header py-2 font-weight-bold"><i class="fas fa-music mr-2"></i> {{ entry.track.title }}</div>
        <div class="card-body text-primary py-1">
            <i class="fas fa-user-circle mr-2"></i> {{ entry.owner.nickname }}
            <i class="fas fa-history mx-2"></i> {{ entry.track.played }}
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
        font-size: 14px;
    }
</style>
