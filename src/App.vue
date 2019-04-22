<template>
  <div class="main">
    <Header/>
    <flash-message class="flash-messages"></flash-message>
    <router-view/>
    <Footer text="Copyright 2019 Henry Haller"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import UserService from "@/services/UserService";

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    document.title = "RSSHub";

    if (process.env.NODE_ENV === "development")
      document.title += "(development)";

    UserService.checkLogin()
      .then(response => {
        this.loginCheckCompleted = true;

        if (response.status === 204) {
          this.$router.push({ name: "Episodes" });
        } else {
          this.$router.push({ name: "Home" });
        }
      })
      .catch(err => {
        this.loginCheckCompleted = true;
      });
  }
};
</script>

<style lang="scss">
@import "src/assets/stylesheets/application.scss";
$background-lighter: #0b3337;
$background-darker: #13262f;

.main {
  background-image: linear-gradient(
    $background-darker,
    $background-lighter,
    $background-darker
  );
}

.flash-messages {
  position: absolute;
  z-index: 25;
  top: 0.5em;
  right: 1em;
}
</style>
