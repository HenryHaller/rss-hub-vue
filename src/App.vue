<template>
  <div id="app" class="main">
    <router-view />
  </div>
</template>

<script></script>

<style lang="scss">
@import "src/assets/stylesheets/application.scss";
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
</style>
