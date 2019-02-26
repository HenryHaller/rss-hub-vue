<template>
  <button type="submit" @click="onClick">Logout</button>
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log("logout button clicked");
      this.$store.commit("CLEAR_JWT");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped></style>
