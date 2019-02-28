<template>
  <div v-if="loggedIn">
    <h1>
      Latest Episodes
      <button @click="showSubscribeModal = true">Add Subscription</button>
    </h1>
    <SubscribeForm
      v-show="showSubscribeModal"
      v-on:close-subscribe-modal="showSubscribeModal = false"
    />
    <ShowsList />
    <LogoutButton />
    <EpisodeList />
  </div>
</template>

<script>
import EpisodeList from "@/components/EpisodeList.vue";
import SubscribeForm from "@/components/SubscribeForm.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ShowsList from "@/components/ShowsList.vue";

export default {
  name: "Episodes",
  components: {
    EpisodeList,
    SubscribeForm,
    ShowsList,
    LogoutButton
  },
  data() {
    return {
      loggedIn: false,
      showSubscribeModal: false
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
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped lang="scss"></style>
