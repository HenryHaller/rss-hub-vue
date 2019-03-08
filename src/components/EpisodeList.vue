<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="!updating && !localUpdating && episodes.length > 0"
      class="episode-list"
      key="episodeList"
    >
      <EpisodeCard
        v-for="episode in episodes"
        :key="episode.id"
        :episode="episode"
        :url="episode.url"
        :title="episode.title"
      />
    </div>
    <div class="no-shows" v-else-if="localUpdating || updating" key="rotating">
      <div class="rotate-forever big-size">&#x27F3;</div>
    </div>
    <div class="no-shows" v-else key="empty">
      You have no episodes. Try subscribing to some shows?
    </div>
  </transition>
</template>

<script>
import EpisodeCard from "@/components/EpisodeCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      localUpdating: true
    };
  },
  methods: {
    ...mapActions({
      fetchEpisodes: "RSSHub/fetchEpisodes"
    })
  },
  created() {
    const update = () => {
      this.fetchEpisodes().catch(err => {
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

    setTimeout(() => {
      console.log("this.localupdating: " + this.localUpdating);
      this.localUpdating = false;
    }, 2200);
  },
  computed: {
    ...mapGetters("RSSHub", {
      episodes: "episodes",
      shows: "shows",
      updating: "updating"
    })
  },
  name: "EpisodeList"
};
</script>

<style scoped>
.big-size {
  font-size: 64px;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
