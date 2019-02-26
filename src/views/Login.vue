<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "login",
  beforeCreate() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$store.commit("SET_JWT", jwt);
      this.$router.push({ name: "episodes" });
    }
  },
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email,
        password: this.password
      };
      UserService.login(credentials);
      if (this.$store.getters.has_jwt) {
        this.$router.push({ name: "episodes" });
      }
      this.email = null;
      this.password = null;
    }
  },
  data() {
    return {
      email: null,
      password: null
    };
  }
};
</script>

<style scoped></style>
