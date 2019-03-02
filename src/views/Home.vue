<template>
  <div class="home">
    <div class="header">
      <h1>RSS Hub</h1>
    </div>
    <div class="forms">
      <LoginForm/>
      <SignUpForm/>
    </div>
    <footer>Copyright 2019 Henry Haller</footer>
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
    document.title = "RSSHub";
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$store.commit("SET_JWT", jwt);
      this.$router.push({ name: "Episodes" });
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin: 5px 0;
  color: moccasin;
}

.forms {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.header {
  position: sticky;
  top: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

footer {
  position: sticky;
  bottom: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: moccasin;
}

.home {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 4em 1fr 4em;
  grid-gap: 27px 0;
}
</style>
