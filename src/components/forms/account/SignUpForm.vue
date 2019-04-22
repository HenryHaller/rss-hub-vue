<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="d-flex flex-column align-items-center"
    >
      <fieldset class="form-group form-inline">
        <label for="email" class="form-control-label">Email</label>
        <input type="email" v-model="email" class="form-control" />
        <label for="password" class="form-control-label">Password</label>
        <input type="password" v-model="password" class="form-control" />
        <label for="password-confirm" class="form-control-label"
          >Confirm Password</label
        >
        <input type="password" v-model="passwordConfirm" class="form-control" />
        <div v-show="!passwordsMatch" class="text-muted">
          Passwords Must Match
        </div>
      </fieldset>
      <input type="submit" value="Sign Up" class="btn btn-primary" />
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
        UserService.register(credentials)
          .then(response => {
            this.flash("Please Verify Your Email");
          })
          .catch(err => {
            if (err.response.data.message === "Duplicate Key") {
              this.flash("That Email Already has an Account", "error");
            } else {
              this.flash("Account Creation Error");
            }
          });
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
