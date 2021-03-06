import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Episodes from './views/Episodes.vue'
import PendingActivation from './views/PendingActivation.vue'
import Activate from './views/Activate.vue'
import PasswordRecoveryAttempt from './views/PasswordRecoveryAttempt.vue'
import ApplicationError from './views/ApplicationError.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/episodes',
      name: 'Episodes',
      component: Episodes
    },
    { path: '/show/:id', name: 'Show', component: Episodes },
    {
      path: '/pending_activation',
      name: 'PendingActivation',
      component: PendingActivation
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/recover',
      name: 'Recover',
      component: PasswordRecoveryAttempt
    },
    {
      path: '/error',
      name: 'ApplicationError',
      component: ApplicationError
    }
  ]
})
