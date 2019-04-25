<template>
  <div class="episodes-view" style="min-height: calc(100vh - 120px)">
    <!-- feed/manage -->
    <div class="nav nav-pills nav-fill">
      <a href="#" class="nav-item nav-link active" v-on:click="toggleMain()" id="feedLink">Feed</a>
      <a href="#" class="nav-item nav-link" v-on:click="toggleMain()" id="manageLink">Manage</a>
    </div>
    <div class="tab-content clearfix">
      <div
        id="feed"
        class="tab-pane active-flex flex-column justify-content-center"
        style="min-height: calc(100vh - 120px - 24px)"
      >
        <div class="episodes-wrapper">
          <EpisodeList/>
        </div>
      </div>
      <div id="manage" class="tab-pane">
        <!-- Inside of Manage tab -->
        <!-- subscriptions/add/account tabs -->
        <div class="nav nav-pills nav-fill">
          <a
            href="#"
            class="nav-item nav-link active"
            v-on:click="toggleManage('#subscriptions', '#subscriptionsLink')"
            id="subscriptionsLink"
          >Subscriptions</a>
          <a
            href="#"
            class="nav-item nav-link"
            v-on:click="toggleManage('#add', '#addLink')"
            id="addLink"
          >Add</a>
          <a
            href="#"
            class="nav-item nav-link"
            v-on:click="toggleManage('#account', '#accountLink')"
            id="accountLink"
          >Account</a>
        </div>
        <div class="tab-content clearfix">
          <div
            class="tab-pane text-center active-flex flex-column justify-content-center"
            id="subscriptions"
            style="min-height: calc(100vh - 120px - 80px)"
          >
            <h3 class="text-light mb-4">Subscriptions</h3>
            <ShowCard
              v-for="show in shows"
              :title="show.title"
              :id="show.id"
              :key="show.id"
              v-on:delete-me="unSubscribe"
              v-on:show-clicked="
                toggleMain()
              "
            />
          </div>
          <div class="tab-pane text-center flex-column justify-content-start" id="add">
            <!-- Inside of SPECIAL! add tab -->
            <!-- search/direct tabs -->
            <div class="nav nav-pills nav-fill">
              <a
                href="#"
                class="nav-item nav-link active"
                v-on:click="toggleAdd()"
                id="searchLink"
              >Search</a>
              <a
                href="#"
                class="nav-item nav-link"
                v-on:click="toggleAdd()"
                id="directLink"
              >Direct Link</a>
            </div>
            <div
              class="tab-content clearfix justify-content-center d-flex flex-column"
              style="min-height: calc(100vh - 120px - 120px)"
            >
              <div class="tab-pane active mt-5" id="search">
                <ListenNotesForm class="mt-5"/>
              </div>
              <div class="tab-pane" id="direct">
                <SubscribeForm class="mt-5"/>
              </div>
            </div>
          </div>
          <div
            class="tab-pane text-center text-center flex-column justify-content-center"
            id="account"
            style="min-height: calc(100vh - 120px - 80px)"
          >
            <div>
              <UpdatePasswordForm class="mb-5"/>
              <LogoutButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EpisodeList from "@/components/EpisodeList.vue";
import UpdatePasswordForm from "@/components/forms/account/UpdatePasswordForm.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ListenNotesForm from "@/components/forms/content/ListenNotesForm.vue";
import SubscribeForm from "@/components/forms/content/SubscribeForm.vue";
import ShowCard from "@/components/ShowCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "Episodes",
  components: {
    EpisodeList,
    UpdatePasswordForm,
    LogoutButton,
    ListenNotesForm,
    SubscribeForm,
    ShowCard
  },
  data() {
    return {
      showSubscribeModal: false,
      showUnSubscribeModal: false,
      showOptionsModal: false
    };
  },
  methods: {
    toggleMain() {
      document
        .querySelectorAll("#feedLink, #manageLink, #manage")
        .forEach(elem => elem.classList.toggle("active"));

      document.querySelector("#feed").classList.toggle("active-flex");
    },
    toggleManage(target, targetLink) {
      document
        .querySelectorAll(
          "#addLink, #subscriptionsLink, #accountLink, #add, #subscriptions, #account"
        )
        .forEach(elem => elem.classList.remove("active", "active-flex"));
      document.querySelector(target).classList.add("active-flex");
      document.querySelector(targetLink).classList.add("active");
    },
    toggleAdd() {
      document
        .querySelectorAll("#direct, #search, #directLink, #searchLink")
        .forEach(elem => elem.classList.toggle("active"));
    },
    unSubscribe(show) {
      this.$store
        .dispatch("RSSHub/unSubscribeShow", show.id)
        .then(() => {
          if (this.$route.params.id == show.id) {
            this.$router.push({ name: "Episodes" });
          }
          this.flash(`Unsubscribed ${show.title}`, "info", {
            timeout: 2000
          });
        })
        .catch(err => {
          console.log("error unsubscribing from a show " + err);
        });
    }
  },
  beforeCreate() {
    document.title = "Episodes";
    this.$store.dispatch("RSSHub/fetchShows");
  },
  computed: {
    ...mapGetters("RSSHub", {
      shows: "shows",
      hasShows: "hasShows",
      updating: "updating"
    })
  }
};
</script>

<style scoped lang="scss">
.episode-view {
  max-width: 1200px;
}

.episodes-wrapper {
  display: flex;
  justify-content: center;
}

.active-flex {
  display: flex;
}

.h-1rem {
  height: 1rem;
}
</style>
