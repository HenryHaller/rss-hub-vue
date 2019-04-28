<template>
  <div class="show-card d-flex">
    <div class="d-flex justify-content-center align-items-center text-center" style="width: 90%">
      <router-link :to="{ name: 'Show', params: { id: id } }">
        <span @click="close">{{ title }}</span>
      </router-link>
      <img :src="showImageUrl" alt style="height: 2.5rem" class="ml-4" />
    </div>
    <div class="ml-3 d-flex align-items-center">
      <button type="submit" class="btn btn-danger" @click="deleteShow">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowCard',
  props: {
    show: Object,
    title: String,
    id: Number
  },
  methods: {
    close() {
      this.$emit('show-clicked')
    },
    deleteShow() {
      this.$emit('delete-me', this)
    }
  },
  computed: {
    showImageUrl() {
      if (this.show.show_img !== null) {
        return this.show.show_img
      } else {
        return ''
      }
    }
  }
}
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
  margin-bottom: 1vh;
}
</style>
