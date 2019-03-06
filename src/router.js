import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Episodes from "./views/Episodes.vue";
import PendingActivation from "./views/PendingActivation.vue";
import Activate from "./views/Activate.vue";
import PasswordRecovery from "./views/PasswordRecovery.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Home
    },
    {
      path: "/episodes",
      name: "Episodes",
      component: Episodes
    },
    {
      path: "/pending_activation",
      name: "PendingActivation",
      component: PendingActivation
    },
    {
      path: "/activate",
      name: "Activate",
      component: Activate
    },
    {
      path: "/recover",
      name: "Recover",
      component: PasswordRecovery
    }
  ]
});
