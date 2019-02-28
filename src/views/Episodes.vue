<template>
  <div v-if="loggedIn">
    <div class="header">
      <h1>Latest Episodes</h1>
      <div class="management-buttons">
        <button @click="showSubscribeModal = true">Add a Feed</button>
        <button @click="showSubscribeModal = true">Delete a Feed</button>
      </div>
    </div>

    <SubscribeForm
      v-show="showSubscribeModal"
      v-on:close-subscribe-modal="showSubscribeModal = false"
    />
    <EpisodeList />
    <ShowsList />
    <LogoutButton />
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

<style scoped lang="scss">
.management-buttons {
  display: flex;
  align-items: center;
  height: 4em;
  button {
    height: 100%;
  }
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
