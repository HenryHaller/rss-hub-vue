import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";

Vue.config.productionTip = false;

import VueFlashMessage from "vue-flash-message";
import './registerServiceWorker'
Vue.use(VueFlashMessage);
require("vue-flash-message/dist/vue-flash-message.min.css");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
