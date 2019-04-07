<template>
  <div class="look-ahead-candidate">
    <div class="publisher-title">
      <div v-html="candidate.publisher_highlighted"></div>
      <div v-html="candidate.title_highlighted"></div>
    </div>
    <div class="subscribe">
      <button class="subscribe-button" @click.prevent="subscribe">
        Subscribe
      </button>
    </div>
    <div class="thumbnail">
      <img :src="candidate.thumbnail" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ListenNotesService from "@/services/ListenNotesService.js";

export default {
  props: {
    candidate: Object
  },
  methods: {
    ...mapActions({
      subscribeShow: "RSSHub/subscribeShow"
    }),

    subscribe() {
      ListenNotesService.podcastLookup(this.candidate.id)
        .then(response => {
          const params = {
            rss_url: response.data.rss
          };
          this.flash(`Subscribing to ${response.data.title}`, "info", {
            timeout: 2000
          });

          this.subscribeShow({ input: params, flash: this.flash });
        })
        .catch(err => {
          this.flash("Subscribing Error", "error", {
            timeout: 2000
          });
          console.log(`directory lookup for ${this.candidate.id} ` + err);
        });
      this.$emit("close-subscribe-modal");
    }
  }
};
</script>

<style scoped lang="scss">
div.publisher-title {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

div.subscribe {
  flex: 0 0 20%;
}

div.thumbnail {
  flex: 0 0 20%;
  justify-content: flex-end;
  display: flex;
}

div.look-ahead-candidate {
  display: flex;
  align-items: center;
}

img {
  height: 64px;
}
</style>
