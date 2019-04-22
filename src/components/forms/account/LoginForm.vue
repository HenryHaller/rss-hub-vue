<template>
  <div>
    <form class="d-flex flex-column align-items-center" @submit.prevent="onSubmit">
      <fieldset class="form-group form-inline">
        <!-- <legend class="d-flex justify-content-center">Login</legend> -->
        <label for="email" class="form-control-label">Email</label>
        <input type="email" name="email" class="form-control" v-model="email">
        <label for="password" class="form-control-label">Password</label>
        <input type="password" class="form-control" name="password" v-model="password">
      </fieldset>
      <input type="submit" class="btn btn-primary" value="Login">
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
          if (response.status == 200) {
            // console.log(response);
            // localStorage.setItem("jwt", response.data.auth_token);
            // this.$store.dispatch("User/setJWT", response.data.auth_token);
            this.flash("Logging in!", "info", {
              timeout: 2000
            });
            this.$router.push({ name: "Episodes" });
            // return response;
          }
        })
        .catch(err => {
          this.flash("Login Failed", "error", {
            timeout: 2000
          });
          console.log("Your error was: " + err);
          // console.log(err.response);
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
