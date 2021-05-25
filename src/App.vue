<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/status">Status</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      userLoggedIn() {
        return this.$store.getters.currentUserLoggedIn;
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: lightblue;
  }

  #nav a.router-link-exact-active {
    color: slateblue;
  }
</style>
