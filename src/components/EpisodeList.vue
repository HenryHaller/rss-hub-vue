<template>
  <div>
    <EpisodeCard
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
      :url="episode.url"
      :title="episode.title"
    />
  </div>
</template>

<script>
import EpisodeCard from "@/components/EpisodeCard.vue";
import RSSHubService from "@/services/RSSHubService.js";

export default {
  components: {
    EpisodeCard
  },
  mounted() {
    RSSHubService.getEpisodes()
      .then(response => {
        this.$store.dispatch("setEpisodes", response.data);
        this.episodes = this.$store.getters.episodes;
      })
      .catch(err => {
        console.log("Your Error is " + err);
      });

    // window.setInterval(updateEpisodes, 1000);
  },
  computed: {
    episodes() {
      return this.$store.getters.episodes;
    }
  },
  name: "EpisodeList"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
