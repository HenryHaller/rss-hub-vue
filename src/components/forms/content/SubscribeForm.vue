<template>
  <div class="d-flex justify-content-center">
    <div class="text-light p-4 rounded" style="background-color: darkslategrey;">
      <form @submit.prevent="onSubmit" class="text-light d-flex flex-column align-items-center">
        <h3>Soundcloud Homepage or RSS Feed</h3>
        <fieldset class="form-group form-inline">
          <input type="text" v-model="rss_url" name="rss_url" class="form-control my-3" />
        </fieldset>
        <input type="submit" value="Submit Link" @click="close" class="btn btn-success" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    close() {
      this.$emit('close-subscribe-modal')
    },
    ...mapActions({
      subscribeShow: 'RSSHub/subscribeShow',
      updating: 'RSSHub/updating',
      notUpdating: 'RSSHub/notUpdating'
    }),
    onSubmit() {
      let input = {
        rss_url: this.rss_url
      }
      // this.updating();
      this.subscribeShow({ input, flash: this.flash })
      this.rss_url = null
      this.$emit('close-subscribe-modal')
    }
  },
  data() {
    return {
      rss_url: null
    }
  }
}
</script>

<style scoped></style>
