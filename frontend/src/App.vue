<template>
  <div>
    <div v-if="authentified">
      <div v-if="connected">
        <router-view></router-view>
        <navigation></navigation>
      </div>
      <!-- Utilisateur non connecté. -->
      <div v-else>
        <error-message></error-message>
      </div>
    </div>
    <!-- Pas de connexion au serveur -->
    <div v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
  import bootstrap from '@/assets/css/bootstrap.min.css'
  import fontawesome from '@/assets/css/fontawesome.min.css'
  import roboto from '@/assets/webfonts/roboto/roboto.css'
  
  import { mapState } from 'vuex'

  import Socket from '@/Socket.js'
  import ErrorMessage from '@/components/ErrorMessage'
  import Navigation from '@/components/Navigation'
  import Login from '@/views/Login'

  export default {
    components: { 
      errorMessage: ErrorMessage,
      login: Login,
      navigation: Navigation
    },
    computed: mapState({
      connected: state => state.socket.connected,
      authentified: state => state.account.authentified
    }),
    created () {
      Socket.on('account/update', account => {
        this.$store.dispatch('account/update', account)
      })
    }
  }
</script>

<style>
  body {
    background: rgb(50, 50, 50);
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: lighter;
    padding: 20px 20px 70px 20px;
  }
</style>


