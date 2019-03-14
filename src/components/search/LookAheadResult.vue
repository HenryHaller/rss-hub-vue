<template>
  <li>
    <div class="publisher-title">
      <div v-html="result.publisher_highlighted"></div>
      <div v-html="result.title_highlighted"></div>
    </div>
    <div class="thumbnail">
      <img :src="result.thumbnail" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    result: Object
  },
  created() {
    console.log(this.result);
  }
};
</script>

<style scoped lang="scss">
div.publisher-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  height: 64px;
}
</style>
