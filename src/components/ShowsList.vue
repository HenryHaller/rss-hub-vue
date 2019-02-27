<template>
  <div>
    <ShowCard
      v-for="show in shows"
      :title="show.title"
      :id="show.id"
      :key="show.id"
      v-on:delete-me="unSubscribe"
    />
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
    unSubscribe(show) {
      this.$store.dispatch("deleteShow", show.id);
      RSSHubService.unSubscribe(show.id).catch(err => {
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

<style scoped></style>
