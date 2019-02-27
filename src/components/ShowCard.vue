<template>
  <div>
    <span>{{ title }}</span>
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

<style scoped></style>
