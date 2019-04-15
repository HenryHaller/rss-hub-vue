<template>
  <div class="main">
    <Header/>
    <flash-message class="flash-messages"></flash-message>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "src/assets/stylesheets/application.scss";
$background-lighter: #0b3337;
$background-darker: #13262f;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(
    $background-darker,
    $background-lighter,
    $background-darker
  );
}

.flash-messages {
  position: absolute;
  z-index: 25;
  top: 0.5em;
  right: 1em;
}
</style>
