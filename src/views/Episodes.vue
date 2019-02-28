<template>
  <div v-if="loggedIn">
    <div class="episodes">
      <div class="header">
        <h1>RSSHub</h1>
      </div>

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
      showSubscribeModal: false,
      showUnSubscribeModal: false
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
.header {
  position: sticky;
  top: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.episode-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 2em 0;
  padding: 0 2vw;
}
h1 {
  margin: 5px 0;
  color: moccasin;
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

.episodes {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 4em 1fr 4em;
  grid-gap: 27px 0;
}
</style>
