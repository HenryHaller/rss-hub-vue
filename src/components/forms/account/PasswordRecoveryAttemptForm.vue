<template>
  <div class="w-100 text-light">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4"
        >
          <form class="d-flex flex-column align-items-sm-center">
            <fieldset class="form-group form-inline text-center">
              <legend>Recover Password</legend>
              <label class="form-control-label" for="password"
                >New Password</label
              >
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="*********"
                v-model="password"
              />

              <label class="form-control-label" for="passwordConfirm"
                >Confirm Password</label
              >
              <input
                type="password"
                class="form-control"
                name="passwordConfirm"
                placeholder="*********"
                v-model="passwordConfirm"
              />
            </fieldset>

            <div v-show="!passwordsMatch" class="text-muted">
              Passwords Must Match
            </div>
            <input
              type="submit"
              value="Reset Password"
              class="btn btn-primary"
            />
          </form>
        </div>
      </div>
    </div>
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
            // console.log(response);
            if (response.status === 204) {
              this.flash("Password Updated", "info", {
                timeout: 2000
              });
              this.$router.push({ name: "Home" });
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
