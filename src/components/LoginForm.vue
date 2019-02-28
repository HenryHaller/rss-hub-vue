<template>
  <div>
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
  name: "LoginForm",
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email,
        password: this.password
      };
      UserService.login(credentials)
        .then(response => {
          console.log(response);
          if (response.data.auth_token) {
            this.$store.dispatch("setJWT", { jwt: response.data.auth_token });
            this.$router.push({ name: "Episodes" });
          }
        })
        .catch(err => {
          console.log("Your error was: " + err);
        });
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
