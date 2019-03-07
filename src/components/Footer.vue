<template>
  <footer>
    <div class="scale-in">{{ text }}</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    text: String
  }
};
</script>

<style scoped lang="scss">
footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  bottom: 0px;
  height: 100%;
  background: black;
  color: moccasin;
}
</style>
