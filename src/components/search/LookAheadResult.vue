<template>
  <div
    class="look-ahead-candidate my-4 p-4 rounded d-flex flex-column flex-sm-row align-items-center justify-content-sm-between"
  >
    <div class="thumbnail">
      <img :src="candidate.thumbnail" />
    </div>

    <div class="m-4">
      <div v-html="candidate.publisher_highlighted"></div>
      <div v-html="candidate.title_highlighted"></div>
    </div>
    <button class="btn btn-success" @click.prevent="subscribe">Subscribe</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ListenNotesService from '@/services/ListenNotesService.js'

export default {
  props: {
    candidate: Object
  },
  methods: {
    ...mapActions({
      subscribeShow: 'RSSHub/subscribeShow'
    }),

    subscribe() {
      ListenNotesService.podcastLookup(this.candidate.id)
        .then(response => {
          const params = {
            rss_url: response.data.rss
          }
          this.flash(`Subscribing to ${response.data.title}`, 'info', {
            timeout: 2000
          })

          this.subscribeShow({ input: params, flash: this.flash })
        })
        .catch(err => {
          this.flash('Subscribing Error', 'error', {
            timeout: 2000
          })
          console.log(`directory lookup for ${this.candidate.id} ` + err)
        })
      this.$emit('close-subscribe-modal')
    }
  }
}
</script>

<style scoped lang="scss">
div.look-ahead-candidate {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  background-color: #352d2d;

  // @media screen and (min-width: 578px) {
  //   flex-direction: row;
  // }
}

img {
  height: 64px;
}
</style>
