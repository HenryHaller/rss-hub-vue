<template>
  <div class="text-light">
    <form @submit.prevent="onSubmit" class="form-inline d-flex flex-column align-items-center">
      <h3>Search for a Podcast</h3>
      <fieldset class="form-group form-inline">
        <input
          type="text"
          class="form-control my-3"
          v-model="searchString"
          name="searchString"
          placeholder="podcast name"
        >
      </fieldset>
    </form>
    <div class="container">
      <transition name="fade" mode="out-in">
        <div class="big-size" v-if="pending > 0">
          <div class="rotate-forever">&#x27F3;</div>
        </div>
        <div v-else>
          <LookAheadResult
            v-for="candidate in candidates"
            :key="candidate.key"
            :candidate="candidate"
            v-on:close-subscribe-modal="close"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import lnClient from "@/services/ListenNotesService.js";
import LookAheadResult from "@/components/search/LookAheadResult.vue";

export default {
  components: {
    LookAheadResult
  },
  name: "ListenNotesForm",
  data() {
    return {
      searchString: null,
      placeholder: "",
      candidates: [],
      pending: 0
    };
  },
  methods: {
    close() {
      this.$emit("close-subscribe-modal");
    }
  },
  watch: {
    searchString: function(searchString) {
      const lookAhead = () => {
        const params = {
          q: searchString,
          show_podcasts: 1
        };
        lnClient
          .typeAhead(params)
          .then(response => {
            this.candidates = response.data.podcasts;
            this.pending = 0;
            // console.log(this.candidates);
          })
          .catch(err => {
            console.log("error in type ahead: " + err);
          });
      };

      if (searchString.length > 3) {
        if (this.pending > 0) {
          clearTimeout(this.pending);
        }
        this.pending = setTimeout(lookAhead, 200);
      } else {
        this.candidates = [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.lightning-notes {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.results-area {
  width: 95%;
}

div.big-size {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
