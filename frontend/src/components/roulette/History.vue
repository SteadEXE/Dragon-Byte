<template>
    <div class="text-center mb-2">
        <p class="mb-0 text-secondary">
            DERNIER NUMÉROS
        </p>
        <span v-for="slot in history" :key="slot.date" class="badge badge-pill mx-1 w-1 history-slot" :class="{ 
            'badge-black': slot.color == 'black',
            'badge-red': slot.color == 'red',
            'badge-green': slot.color == 'green'
        }">
            {{ slot.value }}
        </span>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Store from '@/stores/RouletteStore'
    import Socket from '@/Socket'

    export default {
        store: Store,
        computed: mapState({
            history: state => state.history
        })
    }
</script>

<style>
    .badge-black {
        background-color: #222222;
        color: #ffffff;
    }

    .badge-red {
        background-color: #e74c3c;
        color: #ffffff;
    }

    .badge-green {
        background-color: #2ecc71;
        color: #ffffff;
    }

    .history-slot {
        width: 30px;
    }
</style>


