import Vuex from "vuex";
import Vue from "vue";
import RSSHub from "./modules/RSSHub";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    RSSHub
  },

  state: {
    // = data
  },

  getters: {
    // = computed properties
  }
});
