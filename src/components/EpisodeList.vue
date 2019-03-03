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
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    EpisodeCard
  },
  methods: {
    ...mapActions({
      fetchEpisodes: "RSSHub/fetchEpisodes"
    })
  },
  created() {
    this.loading = true;
    this.fetchEpisodes()
      .then(() => (this.loading = false))
      .catch(err => {
        console.log(
          "error calling fetch episodes from created() in episode list " + err
        );
      });
    // RSSHubService.getEpisodes()
    //   .then(response => {
    //     this.$store.dispatch("setEpisodes", response.data);
    //     // this.episodes = this.$store.getters.episodes;
    //   })
    //   .catch(err => {
    //     console.log("Your Error is " + err);
    //   });

    // window.setInterval(updateEpisodes, 1000);
  },
  computed: {
    ...mapGetters("RSSHub", {
      episodes: "episodes"
    })
  },
  data() {
    return {
      loading: false
    };
  },
  name: "EpisodeList"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
