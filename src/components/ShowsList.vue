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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  name: "ShowsList",
  components: {
    ShowCard
  },
  methods: {
    ...mapActions({
      fetchShows: "RSSHub/fetchShows",
      deleteShow: "RSSHub/deleteShow"
    }),
    close() {
      this.$emit("close-unsubscribe-modal");
    },
    unSubscribe(show) {
      this.loading = true;
      this.deleteShow(show.id)
        .then(() => (this.loading = false))
        .catch(err => {
          console.log(
            "error calling fetch shows from created() in shows list " + err
          );
        });
    }
  },
  created() {
    this.loading = true;
    this.fetchShows()
      .then(() => (this.loading = false))
      .catch(err => {
        console.log(
          "error calling fetch shows from created() in shows list " + err
        );
      });
  },
  computed: {
    ...mapGetters({
      shows: "RSSHub/shows"
    })
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
