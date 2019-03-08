<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-pad">
        <div class="modal-content">
          <form @submit.prevent="onSubmit">
            <label for="rss_url">Soundcloud Homepage or RSS Feed</label>
            <input type="text" v-model="rss_url" name="rss_url" />
            <div class="buttons">
              <input type="submit" />
              <button @click.prevent="close">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    close() {
      this.$emit("close-subscribe-modal");
    },
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
      this.subscribeShow(input).then(() => {
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

<style scoped lang="scss">
form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  input[type="text"] {
    width: 80%;
  }
  .buttons {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
