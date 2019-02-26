<template>
  <div>
    <h3>
      <a :href="episode.url">{{ episode.title }}</a>
    </h3>
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
