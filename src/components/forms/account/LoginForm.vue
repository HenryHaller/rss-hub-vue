<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <h3 class="form.title">Login</h3>
      <div class="label-group">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="label-group">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <input type="submit" value="Login" />
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
      UserService.login(credentials);
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
