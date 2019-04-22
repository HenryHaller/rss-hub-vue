<template>
  <div class="episodes-view" style="min-height: calc(100vh - 60px)">
    <div class="nav nav-pills nav-fill">
      <a
        href="#"
        class="nav-item nav-link active"
        v-on:click="toggleMain()"
        id="feedLink"
        >Feed</a
      >
      <a
        href="#"
        class="nav-item nav-link"
        v-on:click="toggleMain()"
        id="manageLink"
        >Manage</a
      >
    </div>
    <div class="tab-content clearfix">
      <div id="feed" class="tab-pane active">
        <div class="episodes-wrapper">
          <EpisodeList />
        </div>
      </div>
      <div id="manage" class="tab-pane">
        <div class="nav nav-pills nav-fill">
          <a
            href="#"
            class="nav-item nav-link active"
            v-on:click="toggleManage('#current', '#currentLink')"
            id="currentLink"
            >Current</a
          >
          <a
            href="#"
            class="nav-item nav-link"
            v-on:click="toggleManage('#add', '#addLink')"
            id="addLink"
            >Add</a
          >
          <a
            href="#"
            class="nav-item nav-link"
            v-on:click="toggleManage('#account', '#accountLink')"
            id="accountLink"
            >Account</a
          >
        </div>
        <div class="tab-content clearfix">
          <div class="tab-pane active" id="current">
            <ShowCard
              v-for="show in shows"
              :title="show.title"
              :id="show.id"
              :key="show.id"
              v-on:delete-me="unSubscribe"
            />
          </div>
          <div class="tab-pane" id="add">
            <div class="nav nav-pills nav-fill">
              <a
                href="#"
                class="nav-item nav-link active"
                v-on:click="toggleAdd()"
                id="searchLink"
                >Search</a
              >
              <a
                href="#"
                class="nav-item nav-link"
                v-on:click="toggleAdd()"
                id="directLink"
                >Direct Link</a
              >
            </div>
            <div class="tab-content clearfix">
              <div class="tab-pane active" id="search">
                <ListenNotesForm />
              </div>
              <div class="tab-pane" id="direct">
                <SubscribeForm />
              </div>
            </div>
          </div>
          <div class="tab-pane" id="account">
            <UpdatePasswordForm />
            <LogoutButton />
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
        .querySelectorAll("#feedLink, #manageLink, #feed, #manage")
        .forEach(elem => elem.classList.toggle("active"));
    },
    toggleManage(t1, t2) {
      document
        .querySelectorAll(
          "#addLink, #currentLink, #accountLink, #add, #current, #account"
        )
        .forEach(elem => elem.classList.remove("active"));
      document
        .querySelectorAll([t1, t2])
        .forEach(elem => elem.classList.add("active"));
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
