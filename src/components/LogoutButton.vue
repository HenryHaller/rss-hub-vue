<template>
  <button type="submit" @click="onClick" class="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log("logout button clicked");
      this.$store.dispatch("clearJWT");
      this.$router.push({ name: "home" });
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
