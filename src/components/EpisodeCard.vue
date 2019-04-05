<template>
  <transition name="ep">
    <div>
      <div class="episode">
        <div class="show-title-div">
          <router-link :to="{ name: 'Show', params: { id: episode.show_id } }"
            >"{{ episode.show_title }}"</router-link
          >
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
  color: silver;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
