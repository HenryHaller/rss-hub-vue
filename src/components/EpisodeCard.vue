<template>
  <div>
    <a :href="episode.url">{{ episode.title }}</a>
  </div>
</template>

<script>
export default {
  name: "EpisodeCard",
  props: {
    title: String,
    url: String,
    episode: Object
  }
};
</script>

<style scoped></style>
