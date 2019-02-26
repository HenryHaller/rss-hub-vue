<template>
  <div v-if="loggedIn">
    <h1>Latest Episodes</h1>
    <SubscribeForm />
    <LogoutButton />
    <EpisodeList />
  </div>
</template>

<script>
import EpisodeList from "@/components/EpisodeList.vue";
import SubscribeForm from "@/components/SubscribeForm.vue";
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  name: "episodes",
  components: {
    EpisodeList,
    SubscribeForm,
    LogoutButton
  },
  data() {
    return {
      loggedIn: false
    };
  },
  beforeCreate() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$nextTick(() => {
        this.loggedIn = true;
      });
      this.$store.commit("SET_JWT", jwt);
    } else {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped></style>
