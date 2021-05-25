<template>
  <div class="login">
    <section v-if="!userLoggedIn" class="form">
      <h2>{{ loginView ? 'Login' : 'Sign Up' }}</h2>
      <p v-if="error">
        {{ error }}
      </p>
      <input type="text" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <input
        v-if="!loginView"
        type="password"
        placeholder="confirm"
        v-model="passwordVerify"
      />
      <button :disabled="!readyToSubmit" class="primary" @click="authenticate">
        {{ loginView ? 'Login' : 'Sign Up' }}
      </button>
      <a class="toggle" @click="toggleView">{{
        !loginView ? 'Login' : 'Sign Up'
      }}</a>
    </section>
    <section v-else class="logout">
      <button class="warning" @click="logout">
        Logout
      </button>
    </section>
  </div>
</template>

<script>
  import { auth } from '../firebase';
  export default {
    name: 'Login',
    data() {
      return {
        auth,
        loginView: true,
        email: null,
        password: null,
        passwordVerify: null,
        error: null,
      };
    },
    methods: {
      logout() {
        auth.signOut().then(() => {
          this.$store.dispatch('setUser', null);
        });
      },
      toggleView() {
        this.loginView = !this.loginView;
      },
      authenticate() {
        if (this.loginView) {
          this.login();
        } else {
          this.signup();
        }
      },
      async login() {
        try {
          await auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              const { email, emailVerified, uid } = userCredential.user;
              this.$store.dispatch('setUser', { email, emailVerified, uid });
              this.$router.push('status');
            });
        } catch (error) {
          this.error = error.message;
        }
      },
      async signup() {
        try {
          await auth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              const { email, emailVerified, uid } = userCredential.user;
              this.$store.dispatch('setUser', { email, emailVerified, uid });
              this.$router.push('status');
            });
        } catch (error) {
          this.error = error.message;
        }
      },
    },
    computed: {
      emailValid() {
        if (
          this.email?.includes('@') &&
          this.email?.includes('.') &&
          this.email?.length > 5
        ) {
          return true;
        } else return false;
      },
      passwordMatches() {
        if (this.password === this.passwordVerify && !!this.password) {
          return true;
        } else return false;
      },
      readyToSubmit() {
        if (this.loginView) {
          return this.emailValid && !!this.password;
        } else {
          return this.emailValid && this.passwordMatches;
        }
      },
      userLoggedIn() {
        return this.$store.getters.currentUserLoggedIn;
      },
    },
  };
</script>

<style scoped>
  .login {
    display: flex;
    flex-wrap: nowrap;
  }
  .form {
    margin: auto;
    padding: 20px;
    border: 2px white solid;
    border-radius: 0.8rem;
  }
  .logout {
    margin: auto;
  }
  .primary {
    margin-top: 20px;
    background-color: #275a90;
    color: #fff;
  }
  .warning {
    margin-top: 20px;
    background-color: pink;
    color: #000;
  }
  .toggle {
    cursor: pointer;
  }
</style>
