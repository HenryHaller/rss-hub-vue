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
      console.log("I want to delete " + this.title + this.id);
    }
  }
};
</script>

<style scoped></style>
