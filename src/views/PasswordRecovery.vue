<template>
  <div>
    <form class="home-form" @submit.prevent="onSubmit">
      <div class="label-group">
        <label for="password">New Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="label-group">
        <label for="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          v-model="passwordConfirm"
        />
      </div>
      <input type="submit" value="Reset Password" />
    </form>
    <div v-show="!passwordsMatch">Passwords Must Match</div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  data() {
    return {
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    onSubmit() {
      if (this.password === this.passwordConfirm) {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
          m,
          key,
          value
        ) {
          vars[key] = value;
        });
        // console.log(vars);
        let recovery_credentials = {};
        recovery_credentials["recovery_token"] = vars["reset_token"];
        recovery_credentials["email"] = vars["email"];
        recovery_credentials["email"] = decodeURIComponent(
          recovery_credentials["email"]
        );
        recovery_credentials["new_password"] = this.password;

        UserService.attemptRecovery(recovery_credentials)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              this.$router.push({ name: "Login" });
            }
          })
          .catch(err => {
            console.log("Your Error was: " + err);
          });

        this.password = null;
        this.passwordConfirm = null;
      }
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
