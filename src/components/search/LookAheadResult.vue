<template>
  <li>
    <div class="publisher-title">
      <div v-html="result.publisher_highlighted"></div>
      <div v-html="result.title_highlighted"></div>
    </div>
    <button @click.prevent="subscribe">Subscribe</button>
    <div class="thumbnail">
      <img :src="result.thumbnail">
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

import ListenNotesService from "@/services/ListenNotesService.js";

export default {
  props: {
    result: Object
  },
  methods: {
    ...mapActions({
      subscribeShow: "RSSHub/subscribeShow",
      updating: "RSSHub/updating",
      notUpdating: "RSSHub/notUpdating"
    }),

    subscribe() {
      ListenNotesService.podcastLookup(this.result.id)
        .then(response => {
          // console.log(response);
          this.updating();
          const params = {
            rss_url: response.data.rss
          };
          this.subscribeShow({ input: params, flash: this.flash }).then(
            response => {
              this.flash(`Subscribed to ${response.data.title}`, "info", {
                timeout: 2000
              });
            }
          );
          // .catch(err => {
          //   this.flash(" failed to subscribe" + err.response);
          // })
          // .finally(() => {
          //   this.notUpdating();
          // });
        })
        .catch(err => {
          console.log(`directory lookup for ${this.result.id} ` + err);
        });
    }
  }
  // created() {
  //   console.log(this.result);
  // }
};
</script>

<style scoped lang="scss">
div.publisher-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  height: 64px;
}
</style>
