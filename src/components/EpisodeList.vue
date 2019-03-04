<template>
  <div v-if="episodes.length > 0">
    <EpisodeCard
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
      :url="episode.url"
      :title="episode.title"
    />
  </div>
  <div v-else>There are no episodes.</div>
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
    const update = () => {
      this.loading = true;
      this.fetchEpisodes()
        .then(() => (this.loading = false))
        .catch(err => {
          console.log(
            "error calling fetch episodes from created() in episode list " + err
          );
        });
    };
    update();

    let interval;

    if (process.env.NODE_ENV === "development") {
      interval = 3000;
    } else {
      interval = 15000;
    }

    const update_interval_key = window.setInterval(update, interval);

    localStorage.setItem("update_interval_key", update_interval_key);

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
