import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: ""
  },
  mutations: {
    SET_JWT(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem("jwt", jwt);
    },
    CLEAR_JWT(state) {
      state.jwt = "";
      localStorage.removeItem("jwt");
    }
  },
  actions: {},
  getters: {
    has_jwt(state) {
      if (state["jwt"].length > 0) {
        return true;
      } else {
        return false;
      }
    },
    raw_jwt(state) {
      return state["jwt"];
    }
  }
});
