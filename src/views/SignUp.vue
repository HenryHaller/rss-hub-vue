<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <input type="email" />
      <input type="password" />
    </form>
  </div>
</template>

<script>
import RSSHubService from "@/services/RSSHubService.js";

export default {
  name: "signup"
};
</script>

<style scoped></style>
