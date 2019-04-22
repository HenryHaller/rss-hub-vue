<template>
  <button type="submit" @click="onClick" class="btn btn-danger">Logout</button>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  methods: {
    onClick() {
      // debugger;

      UserService.logout()
        .then(response => {
          if (response.status == 204) {
            this.$store.dispatch("RSSHub/clearEverything");
            this.flash("Logged out", "info", {
              timeout: 2000
            });
            this.$router.push({ name: "Home" });
          }
        })
        .catch(err => {
          console.log("log out err: " + err);
        });
    }
  }
};
</script>

<style scoped></style>
