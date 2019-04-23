<template>
  <form
    @submit.prevent="onSubmit"
    class="d-flex flex-column align-items-sm-center"
  >
    <fieldset class="form-group form-inline text-center">
      <label
        for="email"
        class="form-control-label"
        placeholder="example@gmail.com"
        >Email</label
      >
      <input
        type="email"
        name="email"
        v-model="email"
        class="form-control"
        placeholder="example@gmail.com"
      />
    </fieldset>
    <input type="submit" value="Recover Password" class="btn btn-primary" />
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
