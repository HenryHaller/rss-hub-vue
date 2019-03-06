<template>
  <div class="full-page-grid">
    <Header title="RSSHub" />
    <div class="forms">
      <LoginForm />
      <SignUpForm />
      <PasswordRecoveryRequest />
    </div>
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import PasswordRecoveryRequest from "@/components/PasswordRecoveryRequest.vue";

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
  beforeCreate() {
    document.title = "RSSHub";
    if (process.env.NODE_ENV === "development")
      document.title += "(development)";
    if (process.env.NODE_ENV === "local") document.title += "(local)";
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$router.push({ name: "Episodes" });
    }
  }
};
</script>

<style scoped lang="scss"></style>
