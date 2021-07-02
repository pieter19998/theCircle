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
            <b-dropdown right text="Topic">
              <b-dropdown-item to="/topic/">List Topics</b-dropdown-item>
              <b-dropdown-item to="/topic/create/">Create Topic</b-dropdown-item>
            </b-dropdown>
            <b-nav-item to="/profile">Profile</b-nav-item>
            <b-nav-item to="#" v-on:click="bye()">Log out</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item id="register" to="/register">Register</b-nav-item>
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
    }
  },
  methods: {
    ...mapActions(['fetchUserLoggedIn', 'logOut']),
    async bye() {
      await this.logOut();
      await this.$router.push('/');
    },
  },
  computed: mapGetters(['authStatus']),
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
