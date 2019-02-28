<template>
  <div v-if="loggedIn" class="episodes">
    <div class="header">
      <h1>Latest Episodes</h1>
    </div>

    <SubscribeForm
      v-show="showSubscribeModal"
      v-on:close-subscribe-modal="showSubscribeModal = false"
    />
    <EpisodeList class="episode-list" />
    <div class="management-buttons">
      <button @click="showSubscribeModal = true" class="green-button">
        Add Feed
      </button>
      <button @click="showUnSubscribeModal = true" class="red-button">
        Delete Feed
      </button>
    </div>
    <ShowsList
      v-show="showUnSubscribeModal"
      v-on:close-unsubscribe-modal="showUnSubscribeModal = false"
    />
    <LogoutButton class="logout-button" />
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
.episode-list {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h1 {
  margin-bottom: 0;
  margin-top: 5px;
  color: moccasin;
}
.management-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 4em;
  button {
    height: 100%;
    padding: 15px;
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
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.episodes {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 25%;
  box-shadow: 1px 1px;
  background-color: black;
  color: white;
}
</style>
