<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="rss_url" />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import RSSHubService from "@/services/RSSHubService.js";
export default {
  methods: {
    onSubmit() {
      let input = {
        rss_url: this.rss_url
      };
      RSSHubService.subscribe(input)
        .then(
          setTimeout(() => {
            RSSHubService.getEpisodes()
              .then(response => {
                console.log(response.data);
                this.$store.dispatch("setEpisodes", response.data);
              })
              .catch(err => {
                console.log(
                  "Error in fetching episodes after subscribing: " + err
                );
              });
          }, 2000)
        )
        .catch(err => {
          console.log("Error is subscribing: " + err);
        });
      this.rss_url = null;
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
