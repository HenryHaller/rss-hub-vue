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
          <div class="description-text" v-html="episode.description"></div>
        </div>
        <div class="download-box">
          <a :href="episode.url">&#x2B73; Download &#x2B73;</a>
          <router-link :to="{ name: 'Show', params: { id: episode.show_id } }"
            >All Episodes</router-link
          >
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
.episode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 0.5rem;
  background-color: #333;
  display: flex;
  margin: 1rem 0;
  @media screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: center;
  }
  .icon-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem 0 0.5rem 0;
    flex-direction: column;
    justify-content: space-around;
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
  }
  .description-box {
    height: 100%;
    @media screen and (min-width: 900px) {
      width: 100%;
    }
    h3 {
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    .download-box {
      display: flex;
      justify-content: space-around;
    }
    .description-text-box {
      margin: 0 0 0.75rem 0;
      .description-text {
        width: 100%;
        text-indent: 2rem;
      }
    }
    color: silver;
    padding: 0.5rem 1rem;
    h3 {
      margin-top: 0.5rem;
    }
  }
}

.ep-enter-active {
  transition: opacity 4s;
}
.ep-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ep-leave-to {
  opacity: 1;
}
p {
  display: none;
}
</style>
