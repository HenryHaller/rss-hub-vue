<template>
  <div class="main">
    <Header />
    <flash-message class="flash-messages"></flash-message>
    <div v-if="loading" style="min-height: calc(100vh - 120px);">!</div>
    <router-view v-else />
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import UserService from '@/services/UserService'
import EndPointService from '@/services/EndPointService'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loading: true
    }
  },

  beforeCreate() {
    document.title = 'RSSHub'

    if (process.env.NODE_ENV === 'development') document.title += '(development)'

    UserService.checkLogin()
      .then(response => {
        if (response.status === 204) {
          EndPointService.configureEndpoint()
        }
        //set up push notifications

        if (response.status === 204) {
          if (this.$route.name !== 'Show') {
            this.$router.push({ name: 'Episodes' })
          }
        } else {
          if (this.$route.name !== 'PendingActivation') this.$router.push({ name: 'Home' })
        }
      })
      .catch(err => {
        console.log(err)
        this.$router.push({ name: 'ApplicationError' })
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss">
@import 'src/assets/stylesheets/application.scss';
// $background-lighter: #0b3337;
// $background-darker: #13262f;

.main {
  // background-image: linear-gradient(
  //   $background-darker,
  //   $background-lighter,
  //   $background-darker
  // );
  background-color: black;
}

.flash-messages {
  position: absolute;
  z-index: 25;
  top: 0.5em;
  right: 1em;
}
</style>
