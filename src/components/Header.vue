<template>
  <header>
    <router-link to="/">
      <h1>{{ title }}</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
header {
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
</style>
