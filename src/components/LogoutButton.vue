<template>
  <button type="submit" @click="onClick" class="logout">Logout</button>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  methods: {
    onClick() {
      const update_interval_key = this.$store.getters[
        "RSSHub/updateIntervalKey"
      ];
      clearInterval(update_interval_key);
      // localStorage.clear();
      // debugger;

      UserService.logout()
        .then(response => {
          if (response.status == 204) {
            this.$store.dispatch("RSSHub/clearEverything");
            this.flash("Logged out", "info", {
              timeout: 2000
            });
            this.$router.push({ name: "Login" });
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
