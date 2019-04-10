<template>
  <transition name="ep">
    <div>
      <div class="episode">
        <div class="show-title-div">
          <p>
            <router-link :to="{ name: 'Show', params: { id: episode.show_id } }"
              >"{{ episode.show_title }}"</router-link
            >
          </p>
        </div>
        <div class="episode-title-div">
          <a :href="episode.url">
            <p class="episode-title">
              <span>{{ episode.title }}</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  </transition>
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
.ep-enter-active {
  transition: opacity 4s;
}
.ep-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ep-leave-to {
  opacity: 1;
}

a {
  color: silver;
  text-decoration: none;
}

.episode {
  p {
    text-align: center;
  }
  .episode-title-div {
    flex: 1 1 50%;
  }
  .show-title-div {
    flex: 1 1 25%;
  }
  p {
    text-align: center;
  }
  width: 100%;
  color: silver;
  display: flex;
  align-items: center;
  //flex-direction: column;
}
</style>
