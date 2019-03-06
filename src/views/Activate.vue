<template>
  <div class="full-page-grid">
    <Header title="RSSHub" />
    <div>Activating Your account. Please wait.</div>
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
      m,
      key,
      value
    ) {
      vars[key] = value;
    });
    // console.log(vars);
    let activation_credentials = {};
    activation_credentials["activation_token"] = vars["activation_token"];
    activation_credentials["email"] = vars["email"];
    activation_credentials["email"] = decodeURIComponent(
      activation_credentials["email"]
    );
    UserService.activateAccount(activation_credentials).then(response => {
      // console.log(response);
      localStorage.setItem("jwt", response.data.auth_token);
      if (response.status === 200) {
        this.$router.push({ name: "Episodes" });
      }
    });
  }
};
</script>

<style scoped></style>
