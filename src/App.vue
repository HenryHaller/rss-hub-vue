<template>
  <div class="main d-none">
    <Header />
    <flash-message class="flash-messages"></flash-message>
    <router-view />
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import UserService from '@/services/UserService'

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    document.title = 'RSSHub'

    if (process.env.NODE_ENV === 'development') document.title += '(development)'

    UserService.checkLogin()
      .then(response => {
        this.loginCheckCompleted = true
        this.$el.classList.remove('d-none')

        if (response.status === 204) {
          //set up push notifications
          if ('Notification' in window) {
            navigator.serviceWorker.ready.then(reg => {
              Notification.requestPermission(status => {
                console.log(status)
                if (status === 'granted') {
                  console.log(reg)
                  reg.pushManager.subscribe({ userVisibleOnly: true }).then(sub => {
                    console.log(JSON.stringify(sub))
                    console.log(sub.endpoint)
                    UserService.subscribeEndpoint({ endpoint: sub.endpoint })
                      .then(response => {
                        console.log(response)
                        console.log('user subscribed')
                      })
                      .catch(err => {
                        if (err.response.status == 409) {
                          console.log('endpoint already exists')
                        }
                      })
                  })
                }
              })
            })
          }

          if (this.$route.name !== 'Show') {
            this.$router.push({ name: 'Episodes' })
          }
        } else {
          if (this.$route.name !== 'Recover') this.$router.push({ name: 'Home' })
        }
      })
      .catch(err => {
        this.loginCheckCompleted = true
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
