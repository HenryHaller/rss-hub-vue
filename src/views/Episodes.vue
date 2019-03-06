<template>
  <div v-if="loggedIn">
    <div class="full-page-grid">
      <Header title="RSSHub" />

      <EpisodeList class="episode-list" />

      <div class="management-buttons">
        <button @click="showUnSubscribeModal = true" class="red-button">
          -
        </button>

        <LogoutButton class="logout-button" />

        <button @click="showSubscribeModal = true" class="green-button">
          +
        </button>
      </div>
    </div>
    <div>
      <ShowsList
        v-show="showUnSubscribeModal"
        v-on:close-unsubscribe-modal="showUnSubscribeModal = false"
      />
      <SubscribeForm
        v-show="showSubscribeModal"
        v-on:close-subscribe-modal="showSubscribeModal = false"
      />
    </div>
  </div>
</template>

<script>
import EpisodeList from "@/components/EpisodeList.vue";
import SubscribeForm from "@/components/modals/SubscribeForm.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ShowsList from "@/components/modals/ShowsList.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Episodes",
  components: {
    EpisodeList,
    SubscribeForm,
    ShowsList,
    LogoutButton,
    Header
  },
  data() {
    return {
      loggedIn: false,
      showSubscribeModal: false,
      showUnSubscribeModal: false
    };
  },
  beforeCreate() {
    document.title = "Episodes";
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$nextTick(() => {
        this.loggedIn = true;
      });
    } else {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped lang="scss">
.episode-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 2em 0;
  padding: 0 2vw;
  align-content: space-around;
}
.management-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 3em;
  position: sticky;
  bottom: 0px;
  height: 100%;
  background: black;

  button {
    padding: 0 30px;
    height: 70%;
    border-radius: 25%;
    box-shadow: 2px 2px;
    color: white;
    font-weight: bold;
  }
  .green-button {
    background-color: green;
  }

  .red-button {
    background-color: red;
  }

  .red-button,
  .green-button {
    font-size: 32px;
  }
}
</style>
