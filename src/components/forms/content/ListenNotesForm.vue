<template>
  <div class="lightning-notes">
    <form @submit.prevent="onSubmit">
      <label for="searchString">Search for a Podcast</label>
      <input
        type="text"
        v-model="searchString"
        name="searchString"
        placeholder="podcast name"
      />
    </form>
    <div class="results-area">
      <transition name="fade" mode="out-in">
        <ResultList v-if="candidates.length > 0" :results="candidates" />
      </transition>
      <transition name="fade" mode="out-in">
        <div class="rotate-forever big-size" v-if="pending > 0">&#x27F3;</div>
      </transition>
    </div>
  </div>
</template>

<script>
import lnClient from "@/services/ListenNotesService.js";
import ResultList from "@/components/search/LookAheadResultList";
export default {
  components: {
    ResultList
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
</style>
