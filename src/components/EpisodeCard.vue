<template>
  <transition name="ep">
    <div class="episode-box">
      <div class="icon-box">
        <div class="episode-icon" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"></div>
        <h4 class="title-font" style="display: none">{{ episode.show_title }}</h4>
      </div>
      <div class="description-box">
        <h3 class="title">{{ episode.title }}</h3>
        <div class="text-center my-3">
          <button
            class="btn btn-primary"
            type="button"
            v-if="showDescription === false"
            @click="showDescription = true"
          >
            Show description
          </button>
          <button class="btn btn-primary" type="button" v-else @click="showDescription = false">
            Hide Description
          </button>
        </div>

        <div class="description-text-box">
          <div class="description-text" v-if="showDescription" v-html="episode.description"></div>
        </div>

        <div class="download-box">
          <a :href="episode.url">&#x2B73; Download &#x2B73;</a>
          <router-link :to="{ name: 'Show', params: { id: episode.show_id } }">All Episodes</router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EpisodeCard',
  data() {
    return {
      showDescription: false
    }
  },
  props: {
    episode: Object
  },
  computed: {
    backgroundUrl() {
      if (this.episode.show_img !== null) {
        return this.episode.show_img
      } else {
        return ''
      }
    },
    description() {
      if (this.showDescription) {
        return this.showDescription
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.episode-box {
  padding: 0 1rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: #352d2d;
  display: flex;
  margin: 1rem 0;
  @media screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: center;
  }
  .icon-box {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      padding: 0.25rem;
      width: 128px;
      position: relative;
      bottom: 16px;
      margin: 0;
      text-align: center;
      color: silver;
      background-color: #111;
    }
    .episode-icon {
      color: silver;
      border-radius: 50%;
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
    margin-top: 0;
    padding: 0 1rem;

    @media screen and (min-width: 900px) {
      margin-top: 0.5rem;
      width: 100%;
      padding: 2rem;
    }
    h3 {
      margin-top: 0;
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
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 0 0.75rem 0;
      .description-text {
        text-indent: 2rem;
        word-break: break-all;
      }
    }
    color: silver;
    padding: 0 0 1rem 0;
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
