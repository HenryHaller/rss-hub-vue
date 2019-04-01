<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <h3 class="form.title">Update Password</h3>

      <div class="label-group">
        <label for="password">Current Password</label>
        <input type="password" v-model="password" />
      </div>

      <div class="label-group">
        <label for="newPassword">New Password</label>
        <input type="password" v-model="newPassword" />
      </div>

      <div class="label-group">
        <label for="newPasswordConfirm">Confirm new Password</label>
        <input type="password" v-model="newPasswordConfirm" />
      </div>
      <input type="submit" value="Reset Password" />
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
