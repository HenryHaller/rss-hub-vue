<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email">
      <input type="password" v-model="password">
      <input type="password" v-model="password_confirm">
      <input type="submit">
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  data() {
    return {
      email: null,
      password: null,
      password_confirm: null
    };
  },
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email,
        password: this.password
      };
      if (this.password === this.password_confirm) {
        UserService.register(credentials).then(response => {
          console.log(response);
          if (response.data.auth_token) {
            this.$store.dispatch("setJWT", { jwt: response.data.auth_token });
            this.$router.push({ name: "episodes" });
          }
        });
      }
      this.email = null;
      this.password = null;
      this.password_confirm = null;
    }
  }
};
</script>

<style scoped></style>
