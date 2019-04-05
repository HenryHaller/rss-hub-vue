<template>
  <header v-bind:class="{ updating: titleUpdating }">
    <router-link :to="{ name: 'Episodes' }">
      <h1>{{ title }}</h1>
    </router-link>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  props: {
    title: String
  },
  computed: {
    ...mapGetters("RSSHub", {
      titleUpdating: "updating"
    })
  }
};
</script>

<style scoped lang="scss">
header {
  z-index: 10;
  width: 100vw;
  position: sticky;
  top: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
