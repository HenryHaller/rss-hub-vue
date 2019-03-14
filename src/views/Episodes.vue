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
          <button @click="showOptionsModal = true" class="black">
            &#9881;
          </button>
        </div>

        <div class="scale-in">
          <button
            @click="showSubscribeModal = true"
            class="green"
            v-bind:class="{
              bounce:
                !hasShows &&
                !showSubscribeModal &&
                !updating &&
                !showOptionsModal
            }"
          >
            +
          </button>
        </div>
      </footer>
    </div>
    <div>
      <transition name="fade" mode="out-in">
        <OptionsModal
          v-show="showOptionsModal"
          v-on:close-options-modal="showOptionsModal = false"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <ShowsModal
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
        <SubscribeModal
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
import SubscribeModal from "@/components/modals/SubscribeModal.vue";
import OptionsModal from "@/components/modals/OptionsModal.vue";
import ShowsModal from "@/components/modals/ShowsModal.vue";
import Header from "@/components/Header.vue";

import { mapGetters } from "vuex";

export default {
  name: "Episodes",
  components: {
    EpisodeList,
    SubscribeModal,
    ShowsModal,
    OptionsModal,
    Header
  },
  data() {
    return {
      showSubscribeModal: false,
      showUnSubscribeModal: false,
      showOptionsModal: false
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

  .black {
    background-color: black;
  }
}
</style>
