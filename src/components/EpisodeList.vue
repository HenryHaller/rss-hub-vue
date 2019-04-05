<template>
  <transition name="fade" mode="out-in">
    <div
      v-on:scroll="loadNextPage"
      v-if="!initialUpdating && episodes.length > 0"
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
    <div class="no-shows" v-else-if="!initialUpdating" key="empty">
      You have no episodes. Try subscribing to some shows?
    </div>
    <div class="no-shows" v-else key="rotating">
      <div class="rotate-forever big-size">&#x27F3;</div>
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
      initialUpdating: true,
      page: 1,
      showId: this.$route.params.id
    };
  },
  methods: {
    ...mapActions({
      clearEverything: "RSSHub/clearEverything",
      fetchEpisodes: "RSSHub/fetchEpisodes",
      setUpdateIntervalKey: "RSSHub/setUpdateIntervalKey"
    }),
    loadNextPage(event) {
      // console.log(event);
      const target = event.target;
      // console.log(target);
      const scrollTop = target.scrollTop;
      const clientHeight = target.clientHeight;
      const scrollHeight = target.scrollHeight;
      // console.log(
      //   `scrollTop:${scrollTop} clientHeight:${clientHeight} scrollHeight:${scrollHeight}`
      // );
      if (scrollTop + clientHeight >= scrollHeight) {
        this.$store.dispatch("RSSHub/updating");
        this.page++;
        this.updatePage();
      }
    },
    updatePage() {
      return this.$store.dispatch("RSSHub/fetchShowEpisodes", {
        id: this.showId,
        page: this.page
      });
    }
  },
  mounted() {
    this.clearEverything();
    this.updatePage().then(() => {
      this.initialUpdating = false;
    });
  },
  computed: {
    episodes() {
      return this.$store.getters["RSSHub/episodes"](this.$route.params.id);
    },
    ...mapGetters("RSSHub", {
      shows: "shows"
    })
  },
  name: "EpisodeList"
};
</script>

<style scoped>
.episode-list {
  /* display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  grid-gap: 2em 0;
  align-content: space-around; */
  padding: 0 2vw;
  overflow: auto;
  height: 80vh;
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
