<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <div class="label-group">
        <label for="email">Email</label>
        <input type="email" v-model="email">
      </div>

      <div class="label-group">
        <label for="password">Password</label>
        <input type="password" v-model="password">
      </div>

      <div class="label-group">
        <label for="password-confirm">Confirm Password</label>
        <input type="password" v-model="passwordConfirm">
      </div>
      <input type="submit" value="Sign Up">
      <div v-show="!passwordsMatch">Passwords Must Match</div>
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
      passwordConfirm: null
    };
  },
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email,
        password: this.password
      };
      if (this.password === this.passwordConfirm) {
        UserService.register(credentials);
      }
      this.email = null;
      this.password = null;
      this.passwordConfirm = null;
    }
  },
  computed: {
    passwordsMatch() {
      if (this.password === this.passwordConfirm) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped></style>
