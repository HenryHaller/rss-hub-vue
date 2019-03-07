<template>
  <button type="submit" @click="onClick" class="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      const update_interval_key = localStorage.getItem("update_interval_key");
      clearInterval(update_interval_key);
      localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
/* .logout {
  box-shadow: 1px 1px;
  background-color: black;
  font-size: 32px;
  padding: 0 30px;
  height: 70%;
  border-radius: 25%;
  box-shadow: 2px 2px;
  color: white;
  font-weight: bold;
} */
</style>
