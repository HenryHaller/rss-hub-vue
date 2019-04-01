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
      UserService.requestRecovery(credentials)
        .then(response => {
          if (response.status == 204) {
            this.flash("Recovery Email Sent", "info");
          }
        })
        .catch(err => {
          if (err.response.data.message === "Record invalid") {
            this.flash("Account Not Found", "error");
          } else {
            this.flash("Account Recovery Error", "error");
          }
        });
      // this.email = null;
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
