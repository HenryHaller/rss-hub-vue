<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-content">
        <form @submit.prevent="onSubmit">
          <label for="rss_url">Soundcloud Homepage or RSS Feed</label>
          <input type="text" v-model="rss_url" name="rss_url" />
          <div class="buttons">
            <input type="submit" />
            <button @click.prevent="close">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import RSSHubService from "@/services/RSSHubService.js";
export default {
  methods: {
    close() {
      console.log("close button was clicked");
      this.$emit("close-subscribe-modal");
    },
    onSubmit() {
      let input = {
        rss_url: this.rss_url
      };
      RSSHubService.subscribe(input)
        .then(
          setTimeout(() => {
            RSSHubService.getEpisodes()
              .then(response => {
                this.$store.dispatch("setEpisodes", response.data);
              })
              .catch(err => {
                console.log(
                  "Error in fetching episodes after subscribing: " + err
                );
              });
            RSSHubService.getShows()
              .then(response => {
                this.$store.dispatch("setShows", response.data);
              })
              .catch(err => {
                console.log("Your Error is " + err);
              });
          }, 3000)
        )
        .catch(err => {
          console.log("Error is subscribing: " + err);
        });
      this.rss_url = null;
      this.$emit("close-subscribe-modal");
    }
  },
  data() {
    return {
      rss_url: null
    };
  }
};
</script>

<style scoped lang="scss">
form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  input[type="text"] {
    width: 80%;
  }
  .buttons {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
}
.modal-background {
  background-color: lightgrey;
  opacity: 0.5;
  z-index: 10;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}

.modal {
  z-index: 11;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 0vh 2vw;
  height: 21vh;
  width: 93vw;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: green;
  border-radius: 3%;
}
</style>
