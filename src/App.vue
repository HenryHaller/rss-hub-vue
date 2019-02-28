<template>
  <div id="app" class="main">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script></script>

<style lang="scss">
@import "src/assets/stylesheets/application.scss";
$background-lighter: #0b3337;
$background-darker: #13262f;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
    $background-darker,
    $background-lighter,
    $background-darker
  );
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
