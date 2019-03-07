import Vuex from "vuex";
import Vue from "vue";
import RSSHub from "./modules/RSSHub";
import User from "./modules/User";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    RSSHub,
    User
  },

  state: {
    // = data
  },

  getters: {
    // = computed properties
  }
});
