<template>
  <button type="submit" @click="onClick" class="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      const update_interval_key = this.$store.getters[
        "RSSHub/updateIntervalKey"
      ];
      clearInterval(update_interval_key);
      // localStorage.clear();
      // debugger;
      this.$store.dispatch("RSSHub/clearEverything");
      this.$store.dispatch("User/clearJWT");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped></style>
