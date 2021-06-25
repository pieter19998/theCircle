<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">TheCircle Forum</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"/>
        <b-collapse id="nav-collapse" is-nav type="dark">
          <b-navbar-nav class="">
            <b-nav-item to="/">Home</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-if="this.authStatus">
            <b-nav-item to="/user/update/">Profile</b-nav-item>
            <b-nav-item to="#" v-on:click="bye()">Log out</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item id="register" to="/register">Register</b-nav-item>
            <b-nav-item id="login" to="/login">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  data() {
    return {
      username: '',
      loggedIn: this.authStatus
    }
  },
  methods: {
    ...mapActions(['fetchUserLoggedIn', 'fetchCurrentUser', 'fetchAdmin', 'logOut']),
    async bye() {
      await this.logOut();
      await this.$router.push('/');
    },
  },
  computed: mapGetters(['authStatus', 'currentUser']),
  async updated() {
    await this.fetchUserLoggedIn();
    if (this.authStatus) {
      await this.fetchCurrentUser();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
