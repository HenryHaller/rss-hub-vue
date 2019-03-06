<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <div class="label-group">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <input type="submit" value="Recover Password" />
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "PasswordRecovery",
  methods: {
    onSubmit() {
      let credentials = {
        email: this.email
      };
      console.log(credentials);
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
