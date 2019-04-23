<template>
  <div
    class="text-light"
    style="min-height: calc(100vh - 120px);
      display: grid;
      grid-template-rows: 0.5fr 1fr;
      grid-template-columns: 1fr;
  "
  >
    <div class="text-center d-flex flex-column justify-content-center">
      <p>Welcome to RSSHub, your personal podcast tracker.</p>
    </div>

    <div class="w-100">
      <div class="container-fluid" style="flex: 1 4 80%;">
        <div class="row">
          <div
            class="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4"
          >
            <div class="nav nav-pills nav-justified d-flex align-items-center">
              <a
                class="nav-item nav-link active"
                v-on:click="toggleMode('#login', '#loginLink')"
                id="loginLink"
                >Login</a
              >
              <a
                class="nav-item nav-link"
                v-on:click="toggleMode('#signup', '#signupLink')"
                id="signupLink"
                >Sign Up</a
              >
              <a
                class="nav-item nav-link"
                v-on:click="toggleMode('#recover', '#recoveryLink')"
                id="recoveryLink"
                >Password Recovery</a
              >
            </div>
            <div class="tab-content clearfix">
              <div class="tab-pane active" id="login">
                <LoginForm />
              </div>
              <div class="tab-pane" id="signup">
                <SignUpForm />
              </div>
              <div class="tab-pane" id="recover">
                <PasswordRecoveryRequest />
              </div>
            </div>
          </div>
          <!--col-->
        </div>
        <!--row-->
      </div>
      <!--container-->
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/forms/account/LoginForm.vue";
import SignUpForm from "@/components/forms/account/SignUpForm.vue";
import PasswordRecoveryRequest from "@/components/forms/account/PasswordRecoveryRequestForm.vue";

// @ is an alias to /src
export default {
  components: {
    LoginForm,
    SignUpForm,
    PasswordRecoveryRequest
  },
  name: "Home",
  methods: {
    toggleMode(t1, t2) {
      document.querySelectorAll(".nav-item, .tab-pane").forEach(item => {
        item.classList.remove("active");
      });
      document.querySelector(t1).classList.add("active");
      document.querySelector(t2).classList.add("active");
    }
  }
};
</script>

<style scoped lang="scss">
.forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
