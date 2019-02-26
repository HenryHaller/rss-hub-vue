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
    },
    CLEAR_JWT(state) {
      state.jwt = "";
    }
  },
  actions: {
    setJWT({ commit }, jwt) {
      localStorage.setItem("jwt", jwt);
      commit("SET_JWT", jwt);
    },
    clearJWT({ commit }) {
      localStorage.removeItem("jwt");
      commit("CLEAR_JWT");
    }
  },
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
