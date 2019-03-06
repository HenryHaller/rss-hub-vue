<template>
  <div v-if="episodes.length > 0" class="episode-list">
    <EpisodeCard
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
      :url="episode.url"
      :title="episode.title"
    />
  </div>
  <div class="no-shows" v-else>
    You have no episodes. Try subscribing to some shows?
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

<style scoped>
.episode-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 2em 0;
  padding: 0 2vw;
  align-content: space-around;
}

.no-shows {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  color: moccasin;
}
</style>
