<template>
  <header v-bind:class="{ updating: titleUpdating }">
    <router-link :to="{ name: 'Episodes' }">
      <h1 v-html="title"></h1>
    </router-link>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  watch: {
    "$route.params.id": function() {
      document.title = this.title;
    }
  },
  computed: {
    title() {
      if (this.$route.params.id === undefined) {
        return "RSSHub";
      } else {
        const shows = this.$store.getters["RSSHub/shows"];
        if (shows.length === 0) return "&#x27F3;";
        const showId = parseInt(this.$route.params.id);
        const targetShow = shows.find(show => show.id === showId);
        try {
          return targetShow.title;
        } catch (err) {
          return "RSSHub";
        }
      }
    },
    ...mapGetters("RSSHub", {
      titleUpdating: "updating"
    })
  }
};
</script>

<style scoped lang="scss">
header {
  text-align: center;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: darkslategray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 60px;
  h1 {
    animation: 1s ease-out 0s 1 appear;
    margin: 5px 0;
    color: moccasin;
  }
}

.updating {
  h1::after {
    content: "\27F3";
    animation: 2.5s linear 0s infinite spinner;
    color: moccasin;
    display: inline-block;
    position: relative;
  }
}
</style>
