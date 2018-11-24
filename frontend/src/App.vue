<template>
    <div>
        <div v-if="authentified">
            <div v-if="connected">
                <navigation></navigation>
                <router-view></router-view>
                <profile></profile>
            </div>
            <!-- Utilisateur non connecté. -->
            <div v-else>
                <error-message class="flashing"></error-message>
            </div>
        </div>
        <!-- Pas de connexion au serveur -->
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import bootstrap from '@/assets/css/bootstrap.min.css'
    import fontawesome from '@/assets/css/fontawesome.min.css'
    import animations from '@/assets/css/animations.css'
    import roboto from '@/assets/webfonts/roboto/roboto.css'

    import {mapState} from 'vuex'

    import Socket from '@/Socket.js'
    import ErrorMessage from '@/components/ErrorMessage'
    import Navigation from '@/components/Navigation'
    import Profile from '@/components/Profile'
    import Login from '@/views/Login'

    export default {
        components: {
            errorMessage: ErrorMessage,
            login: Login,
            navigation: Navigation,
            profile: Profile
        },
        computed: mapState({
            connected: state => state.socket.connected,
            authentified: state => state.account.authentified
        }),
        created() {
            Socket.on('account/update', account => {
                this.$store.dispatch('account/update', account)
            })

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(this.onPositition, null, {
                    enableHighAccuracy: true
                })
            }
        },
        methods: {
            onPositition(position) {
                Socket.emit('account/position', position.coords.latitude, position.coords.longitude)
            }
        }
    }
</script>

<style>
    body {
        background: rgb(50, 50, 50);
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: lighter;
        padding: 70px 20px 70px 20px;
    }
</style>


