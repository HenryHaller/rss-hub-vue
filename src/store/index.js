import Vuex from "vuex";
import Vue from "vue";
import JWT from "./modules/JWT";
import RSSHub from "./modules/RSSHub";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    JWT,
    RSSHub
  },

  state: {
    // = data
  },

  getters: {
    // = computed properties
  },

  actions: {},
  mutations: {}
});
