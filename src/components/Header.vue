<template>
  <header>
    <h1>{{ title }}</h1>
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
    margin: 5px 0;
    color: moccasin;
  }
}
</style>
