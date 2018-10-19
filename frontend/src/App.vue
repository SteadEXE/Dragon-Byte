<template>
  <div>
    <div v-if="connected">
      <div v-if="authentified">
        <router-view></router-view>
      </div>
      <!-- Utilisateur non connecté. -->
      <div v-else>
        <login></login>
      </div>
    </div>
    <!-- Pas de connexion au serveur -->
    <div v-else>
      <error-message></error-message>
    </div>
  </div>
</template>

<script>
  import bootstrap from './assets/css/bootstrap.min.css'
  import fontawesome from './assets/css/fontawesome.min.css'
  
  import { mapState } from 'vuex'

  import Socket from './Socket.js'
  import ErrorMessage from './components/ErrorMessage'
  import Login from './views/Login'

  export default {
    components: { 
      errorMessage: ErrorMessage,
      login: Login
    },
    computed: mapState({
      connected: state => state.socket.connected,
      authentified: state => state.account.authentified
    })
  }
</script>

<style>
  body {
    background: rgb(50, 50, 50);
    font-family: 'Helvetica', 'Arial', sans-serif;
  }
</style>


