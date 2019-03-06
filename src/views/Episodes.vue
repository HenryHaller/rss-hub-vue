<template>
  <div>
    <div class="full-page-grid">
      <Header title="RSSHub"/>

      <EpisodeList class="episode-list"/>

      <footer class="management-buttons">
        <button @click="showUnSubscribeModal = true" class="red-button">-</button>

        <LogoutButton class="logout-button"/>

        <button @click="showSubscribeModal = true" class="green-button">+</button>
      </footer>
    </div>
    <div>
      <transition name="fade" mode="out-in">
        <ShowsList
          v-show="showUnSubscribeModal"
          v-on:close-unsubscribe-modal="showUnSubscribeModal = false"
          key="one"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <SubscribeForm
          v-show="showSubscribeModal"
          v-on:close-subscribe-modal="showSubscribeModal = false"
          key="one"
        />
      </transition>
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
      showSubscribeModal: false,
      showUnSubscribeModal: false
    };
  },
  beforeCreate() {
    document.title = "Episodes";
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.$router.push({ name: "Login" });
      // this.$nextTick(() => {
      //   this.loggedIn = true;
      // });
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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
  position: sticky;
  bottom: 0px;
  height: 100%;
  background: black;

  button {
    animation: 2s ease-out 0s 1 appear2;
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
