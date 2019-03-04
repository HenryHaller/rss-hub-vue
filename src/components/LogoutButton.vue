<template>
  <button type="submit" @click="onClick" class="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log("logout button clicked");
      const update_interval_key = localStorage.getItem("update_interval_key");
      clearInterval(update_interval_key);
      localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
.logout {
  padding: 0 10px;
  border-radius: 25%;
  box-shadow: 1px 1px;
  background-color: black;
  color: white;
}
</style>
