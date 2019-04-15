<template>
  <transition name="ep">
    <div class="episode-box">
      <div class="icon-box">
        <div
          class="episode-icon"
          :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"
        >
          <span class="show-title">{{ episode.show_title }}</span>
        </div>
      </div>
      <div class="description-box">
        <h3 class="title">{{ episode.title }}</h3>
        <div class="description-text-box">
          <span class="description-text" v-html="episode.description"></span>
        </div>
        <div class="download-box">
          <a :href="episode.url">Download</a>
          <router-link :to="{ name: 'Show', params: { id: episode.show_id } }">
            All Episodes
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EpisodeCard",
  props: {
    episode: Object
  },
  computed: {
    backgroundUrl() {
      if (this.episode.show_img !== null) {
        return this.episode.show_img;
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.ep-enter-active {
  transition: opacity 4s;
}
.ep-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ep-leave-to {
  opacity: 1;
}

a {
  color: silver;
  text-decoration: none;
}
.icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0;
  flex-direction: column;
  justify-content: space-around;
}
.episode-box {
  border-radius: 10px;
  padding: 0.5rem;
  background-color: #333;
  display: flex;
  margin: 1rem 0;
}

.title {
  text-align: center;
}

@media screen and (max-width: 578px) {
  .episode-box {
    flex-direction: column;
    align-items: center;
  }
}

.description-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  align-content: center;
  .download-box {
    display: flex;
    justify-content: space-around;
    // width: 100%;
  }
  .description-text-box {
    display: flex;
    justify-content: center;
    margin-bottom: 0.75rem;
    .description-text {
      text-indent: 2rem;
    }
  }
  color: silver;
  padding: 0.5rem 1rem;
  h3 {
    margin-top: 0.5rem;
  }
}
.episode-icon {
  display: flex;
  flex-direction: column-reverse;

  span {
    white-space: pre;
    color: silver;
    background-color: #111;
  }
  border-radius: 50%;
  margin: 1em;
  box-shadow: 0px -7px 3px 6px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left top;
  position: relative;
  p {
    text-align: center;
  }
  width: 128px;
  height: 128px;
  //flex-direction: column;
}
</style>
