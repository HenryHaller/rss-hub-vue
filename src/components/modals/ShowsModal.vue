<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-pad">
        <div class="modal-content">
          <div class="show-list">
            <ShowCard
              v-for="show in shows"
              :title="show.title"
              :id="show.id"
              :key="show.id"
              v-on:delete-me="unSubscribe"
              v-on:close-me="close"
            />
          </div>
          <div class="close-button">
            <button @click="close" class="close-button">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  name: "ShowsList",
  components: {
    ShowCard
  },
  methods: {
    ...mapActions({
      fetchShows: "RSSHub/fetchShows",
      unSubscribeShow: "RSSHub/unSubscribeShow"
    }),
    close() {
      this.$emit("close-unsubscribe-modal");
    },
    unSubscribe(show) {
      this.unSubscribeShow(show.id)
        .then(() => {
          this.$emit("delete-show", show.id);
          if (this.$route.params.id == show.id) {
            this.$router.push({ name: "Episodes" });
          }
          this.flash(`Unsubscribed ${show.title}`, "info", {
            timeout: 2000
          });
        })
        .catch(err => {
          console.log(
            "error calling fetch shows from created() in shows list " + err
          );
        });
    }
  },
  created() {
    this.loading = true;
    this.fetchShows()
      .then(() => (this.loading = false))
      .catch(err => {
        console.log(
          "error calling fetch shows from created() in shows list " + err
        );
      });
  },
  computed: {
    ...mapGetters({
      shows: "RSSHub/shows"
    })
  }
};
</script>

<style scoped lang="scss">
.show-list {
  align-self: center;
}

.close-button {
  justify-self: center;
  align-self: center;
}
</style>
