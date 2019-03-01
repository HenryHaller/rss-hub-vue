<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <div class="label-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" />
      </div>

      <div class="label-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" />
      </div>

      <div class="label-group">
        <label for="password-confirm">Confirm Password</label>
        <input type="password" v-model="password_confirm" />
      </div>
      <input type="submit" value="Sign Up" />
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
            this.$router.push({ name: "Episodes" });
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
