<template>
  <div>
    <ul>
      <LookAheadResult v-for="result in results" :key="result.key" :result="result"/>
    </ul>
  </div>
</template>

<script>
import LookAheadResult from "@/components/search/LookAheadResult.vue";

export default {
  components: {
    LookAheadResult
  },
  props: {
    results: Array
  }
  // created() {
  //   console.log(this.results);
  // }
};
</script>

<style scoped lang="scss">
ul {
  padding-inline-start: 0;
}
</style>
