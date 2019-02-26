<template>
  <div>
    <ShowCard
      v-for="show in shows"
      :title="show.title"
      :id="show.id"
      :key="show.id"
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
  mounted() {
    RSSHubService.getShows()
      .then(response => {
        this.shows = response.data;
        console.log(response);
      })
      .catch(err => {
        console.log("Your Error is " + err);
      });
  },
  data() {
    return { shows: [] };
  }
};
</script>

<style scoped></style>
