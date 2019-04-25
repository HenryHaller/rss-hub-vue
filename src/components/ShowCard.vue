<template>
  <div class="show-card">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <router-link :to="{ name: 'Show', params: { id: id } }">
        <span @click="close">{{ title }}</span>
      </router-link>
    </div>
    <div style="align-self: center; justify-self:center">
      <button type="submit" class="btn btn-danger" @click="deleteShow">
        Delete
      </button>
    </div>
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
    close() {
      this.$emit("show-clicked");
    },
    deleteShow() {
      this.$emit("delete-me", this);
    }
  }
};
</script>

<style lang="scss" scoped>
.show-card:nth-child(even) {
  div:first-of-type {
    background-color: #4c3f3f;
  }
}

.show-card:nth-child(odd) {
  div:first-of-type {
    background-color: darkslategray;
  }
}

.show-card {
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin-bottom: 1vh;
  .title-box {
    justify-self: center;
  }
}
</style>
