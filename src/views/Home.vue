<template>
  <div class="full-page-grid">
    <Header title="RSSHub" />
    <div v-if="loginCheckCompleted" class="forms">
      <LoginForm />
      <SignUpForm />
      <PasswordRecoveryRequest />
    </div>
    <div v-else></div>
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import LoginForm from "@/components/forms/account/LoginForm.vue";
import SignUpForm from "@/components/forms/account/SignUpForm.vue";
import UserService from "@/services/UserService";
import PasswordRecoveryRequest from "@/components/forms/account/PasswordRecoveryRequestForm.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

// @ is an alias to /src
export default {
  components: {
    LoginForm,
    SignUpForm,
    PasswordRecoveryRequest,
    Header,
    Footer
  },
  name: "login",
  data() {
    return {
      loginCheckCompleted: false
    };
  },
  beforeCreate() {
    document.title = "RSSHub";

    if (process.env.NODE_ENV === "development")
      document.title += "(development)";

    UserService.checkLogin()
      .then(response => {
        this.loginCheckCompleted = true;
        if (response.status === 204) {
          this.$router.push({ name: "Episodes" });
        }
      })
      .catch(err => {
        this.loginCheckCompleted = true;
      });
  }
};
</script>

<style scoped lang="scss"></style>
