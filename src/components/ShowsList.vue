<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-content">
        <ShowCard
          v-for="show in shows"
          :title="show.title"
          :id="show.id"
          :key="show.id"
          v-on:delete-me="unSubscribe"
        />
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard.vue";
import RSSHubService from "@/services/RSSHubService.js";
export default {
  name: "ShowsList",
  components: {
    ShowCard
  },
  methods: {
    close() {
      this.$emit("close-unsubscribe-modal");
    },
    unSubscribe(show) {
      this.$store.dispatch("deleteShow", show.id);
      RSSHubService.unSubscribe(show.id)
        .then(() => {
          RSSHubService.getEpisodes()
            .then(response => {
              this.$store.dispatch("setEpisodes", response.data);
            })
            .catch(err => {
              console.log(
                "Error in fetching episodes after subscribing: " + err
              );
            });
        })
        .catch(err => {
          console.log(`error while deleting ${show.id} ` + err);
        });
    }
  },
  mounted() {
    RSSHubService.getShows()
      .then(response => {
        this.$store.dispatch("setShows", response.data);
      })
      .catch(err => {
        console.log("Your Error is " + err);
      });
  },
  computed: {
    shows() {
      return this.$store.getters.shows;
    }
  }
  // data() {
  //   return { shows: this.$store.getters.shows };
  // }
};
</script>

<style scoped lang="scss">
// form {
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
//   input[type="text"] {
//     width: 80%;
//   }
//   .buttons {
//     width: 80%;
//     display: flex;
//     justify-content: space-between;
//   }
// }
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
