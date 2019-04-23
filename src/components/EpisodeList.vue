<template>
  <transition name="fade" mode="out-in">
    <div
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
      <div v-if="listExhausted" class="no-more-shows">&#x1F6AB;</div>
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
import { mapActions } from "vuex";

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      initialUpdating: true,
      page: 1,
      listExhausted: false
    };
  },
  methods: {
    ...mapActions({
      fetchEpisodes: "RSSHub/fetchEpisodes",
      setUpdateIntervalKey: "RSSHub/setUpdateIntervalKey"
    }),
    loadNextPage() {
      const feedActive = document
        .querySelector("#feedLink")
        .classList.contains("active");
      if (this.listExhausted === false && feedActive === true) {
        if (
          window.innerHeight + Math.ceil(window.pageYOffset + 1) >=
          document.body.offsetHeight
        ) {
          this.$store.dispatch("RSSHub/updating");
          this.page++;
          this.localUpdate();
        }
      }
    },
    localUpdate() {
      this.$store.dispatch("RSSHub/updating");
      return this.updatePage();
    },
    updatePage() {
      return this.$store
        .dispatch("RSSHub/fetchShowEpisodes", {
          id: this.showId,
          page: this.page
        })
        .then(response => {
          if (response.data.length === 0) {
            this.flash("End of Results", "info", { timeout: 2000 });
            this.listExhausted = true;
          }
        });
    }
  },
  mounted() {
    this.updatePage().then(() => {
      this.initialUpdating = false;
    });
    document.onscroll = this.loadNextPage;
  },
  destroyed() {
    document.onscroll = null;
  },
  computed: {
    episodes() {
      const feed = this.$store.getters["RSSHub/feed"];
      if (this.$route.params.id === undefined) {
        return feed;
      } else {
        return feed.filter(
          item => item.show_id === parseInt(this.$route.params.id)
        );
      }
    },
    showId() {
      return this.$route.params.id;
    },
    shows() {
      return this.$store.getters["RSSHub/shows"];
    }
  },
  watch: {
    "$route.params.id": function() {
      this.$store.dispatch("RSSHub/resetFeed");
      this.page = 1;
      this.listExhausted = false;
      this.initialUpdating = true;
      setTimeout(() => {
        this.initialUpdating = false;
      }, 1000);
      this.updatePage();
    }
  },
  name: "EpisodeList"
};
</script>

<style scoped>
.episode-list {
  max-width: 1200px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 0 2vw;
  /* overflow: auto; */
  min-height: calc(100vh - 20px - 8em);
}

.no-more-shows {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  color: red;
  font-size: 48px;
  height: 256px;
  width: 256px;
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
