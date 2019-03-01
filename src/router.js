import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Episodes from "./views/Episodes.vue";

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
    }
  ]
});
