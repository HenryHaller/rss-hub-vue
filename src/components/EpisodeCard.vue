<template>
  <div>
    <a :href="episode.url">
      <div class="episode">
        <div class="show-title-div">"{{ episode.show_title }}"</div>
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
    episode: Object
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
