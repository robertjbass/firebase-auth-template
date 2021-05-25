<template>
  <div class="status">
    <h2>Status</h2>
    <h3>
      {{ userLoggedIn ? 'You are logged in ✅' : 'You are not logged in 😨' }}
    </h3>
  </div>
</template>

<script>
  export default {
    name: 'Status',
    computed: {
      userLoggedIn() {
        return this.$store.getters.currentUserLoggedIn;
      },
    },
  };
</script>
