<template>
  <div>
    <a :href="episode.url">
      <div class="episode">
        <div class="show-title-div">"{{ showTitle }}"</div>
        <div class="episode-title-div">
          <p class="episode-title">
            <span>{{ episode.title }}</span>
          </p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "EpisodeCard",
  props: {
    title: String,
    url: String,
    episode: Object
  },
  computed: {
    showTitle() {
      if (this.$store.getters.shows.length > 0) {
        const shows = this.$store.getters.shows;
        const show = shows.filter(show => show.id === this.episode.show_id)[0];
        return show.title;
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: silver;
}

.episode {
  display: flex;
  justify-content: space-between;
  p {
  }
  .episode-title {
    text-align: center;
    margin: 0 0;
    span {
      font-style: italic;
    }
  }

  .show-title-div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .episode-title-div {
    width: 65%;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    // align-items: center;
  }
}
</style>
