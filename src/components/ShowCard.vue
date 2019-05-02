<template>
  <div class="show-card d-flex">
    <div
      class="d-flex justify-content-between justify-content-sm-center align-items-center text-center px-3 py-2"
      style="flex: 0 0 60%"
    >
      <router-link :to="{ name: 'Show', params: { id: id } }">
        <span @click="close">{{ title }}</span>
      </router-link>
      <img :src="showImageUrl" alt style="height: 2.5rem" class="ml-4" />
    </div>
    <div class="d-flex align-items-center justify-content-center px-4" style="flex: 0 0 40%">
      <button type="submit" class="btn btn-danger" @click="deleteShow">Delete</button>
      <button type="submit" class="btn btn-secondary" @click="setNotifications(true)" v-show="!show.notifications">
        Notify
      </button>
      <button type="submit" class="btn btn-secondary" @click="setNotifications(false)" v-show="show.notifications">
        Silence
      </button>
    </div>
  </div>
</template>

<script>
import RSSHubService from '@/services/RSSHubService.js'

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
    },
    setNotifications(status) {
      RSSHubService.setNotifications({ show_id: this.show.id, subscribed: status })
        .then(() => {
          console.log('updated status for: ' + this.show.title)
        })
        .then(() => {
          this.$store.dispatch('RSSHub/fetchShows').then(() => {
            console.log('Shows updated for subscription')
          })
        })
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
