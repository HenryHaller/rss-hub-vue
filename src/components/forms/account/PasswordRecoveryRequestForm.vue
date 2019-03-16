<template>
  <form class="home-form" @submit.prevent="onSubmit">
    <h3 class="form.title">Recover Password</h3>
    <div class="label-group">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email" />
    </div>
    <input type="submit" value="Recover Password" />
  </form>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "PasswordRecoveryRequest",
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email
      };
      UserService.requestRecovery(credentials).catch(err => {
        console.log(err);
      });
      this.email = null;
    }
  },
  data() {
    return {
      email: null
    };
  }
};
</script>

<style scoped></style>
