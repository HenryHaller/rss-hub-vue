<template>
  <div>Activating Your account. Please wait.</div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
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
