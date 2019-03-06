<template>
  <div class="show-card">
    <div></div>
    <div class="title-box">{{ title }}</div>
    <button type="submit" @click="onClick">Delete</button>
  </div>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    title: String,
    id: Number
  },
  methods: {
    onClick() {
      this.$emit("delete-me", this);
    }
  }
};
</script>

<style lang="scss" scoped>
.show-card {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  margin-bottom: 1vh;
  .title-box {
    justify-self: center;
  }
}
</style>
