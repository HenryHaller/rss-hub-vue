<template>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="onSubmit" class="text-light">
      <fieldset class="form-group form-inline">
        <legend class="justify-content-center d-flex mb-3">Update Password</legend>
        <label for="password" class="form-control-label">Current Password</label>
        <input type="password" v-model="password" class="form-control">

        <label for="newPassword" class="form-control-label">New Password</label>
        <input type="password" v-model="newPassword" class="form-control">

        <label for="newPasswordConfirm" class="form-control-label">Confirm new Password</label>
        <input type="password" v-model="newPasswordConfirm" class="form-control">
      </fieldset>

      <input type="submit" class="btn btn-warning" value="Reset Password">
      <div v-show="!passwordsMatch">Passwords Must Match</div>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      password: null,
      newPassword: null,
      newPasswordConfirm: null
    };
  },
  methods: {
    onSubmit() {
      let credentials = {
        current_password: this.password,
        new_password: this.newPassword
        // email: this.decoded_jwt.user_email
      };
      if (this.newPassword === this.newPasswordConfirm) {
        UserService.updatePassword(credentials)
          .then(response => {
            if (response.status == 204) {
              this.flash("Password Updated", "info", {
                timeout: 2000
              });
            }
          })
          .catch(err => {
            this.flash("Password could not be updated.", "error");
            console.log("error updating password: " + err);
          });
      }
      this.password = null;
      this.newPassword = null;
      this.newPasswordConfirm = null;
    }
  },
  computed: {
    // ...mapGetters({
    //   decoded_jwt: "User/decoded_jwt"
    // }),
    passwordsMatch() {
      if (this.newPassword === this.newPasswordConfirm) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped></style>
