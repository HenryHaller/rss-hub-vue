<template>
  <form @submit.prevent="onSubmit">
    <label for="rss_url">Soundcloud Homepage or RSS Feed</label>
    <input type="text" v-model="rss_url" name="rss_url">
    <input type="submit" value="Submit Link">
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      subscribeShow: "RSSHub/subscribeShow",
      updating: "RSSHub/updating",
      notUpdating: "RSSHub/notUpdating"
    }),
    onSubmit() {
      let input = {
        rss_url: this.rss_url
      };
      this.updating();
      this.subscribeShow({ input, flash: this.flash }).finally(() => {
        this.notUpdating();
      });
      this.rss_url = null;
      this.$emit("close-subscribe-modal");
    }
  },
  data() {
    return {
      rss_url: null
    };
  }
};
</script>

<style scoped></style>
