<template>
  <div>
    <div class="full-page-grid">
      <Header title="RSSHub" />

      <EpisodeList />

      <footer class="management-buttons">
        <div class="scale-in">
          <button
            @click="showUnSubscribeModal = true"
            v-bind:class="{
              disabled: !hasShows,
              red: hasShows
            }"
            :disabled="!hasShows"
          >
            -
          </button>
        </div>

        <div class="scale-in">
          <LogoutButton class="logout-button" />
        </div>

        <div class="scale-in">
          <button
            @click="showSubscribeModal = true"
            class="green"
            v-bind:class="{
              bounce: !hasShows && !showSubscribeModal && !updating
            }"
          >
            +
          </button>
        </div>
      </footer>
    </div>
    <div>
      <transition name="fade" mode="out-in">
        <ShowsList
          v-show="showUnSubscribeModal"
          v-on:close-unsubscribe-modal="showUnSubscribeModal = false"
          v-on:delete-show="
            if (!hasShows) {
              showUnSubscribeModal = false;
            }
          "
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

import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters("RSSHub", {
      hasShows: "hasShows",
      updating: "updating",
      episodes: "episodes"
    })
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

.management-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  bottom: 0px;
  height: 100%;
  background: black;

  button {
    transition: background-color 2.5s;
    font-size: 32px;
    padding: 0 30px;
    height: 70%;
    border-radius: 25%;
    box-shadow: 2px 2px;
    color: white;
    font-weight: bold;
  }

  button.bounce {
    animation: 1s ease-out 2s infinite bounce;
  }

  .disabled {
    background-color: grey;
  }

  .green {
    background-color: green;
  }

  .red {
    background-color: red;
  }
}
</style>
