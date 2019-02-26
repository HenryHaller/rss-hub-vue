<template>
  <div class="home">
    <h1>RSS Hub</h1>
    <LoginForm />
    <SignUpForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";

// @ is an alias to /src
export default {
  components: { LoginForm, SignUpForm },
  name: "login",
  beforeCreate() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$store.commit("SET_JWT", jwt);
      this.$router.push({ name: "episodes" });
    }
  }
};
</script>

<style scoped></style>
