import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: "",
    episodes: [],
    shows: []
  },
  mutations: {
    SET_JWT(state, jwt) {
      state.jwt = jwt;
    },
    CLEAR_JWT(state) {
      state.jwt = "";
    },
    ADD_EPISODES(state, episodes) {
      state.episodes = state.episodes.push(episodes);
    },
    SET_SHOWS(state, shows) {
      state.shows = shows;
    }
  },
  actions: {
    setJWT({ commit }, jwt) {
      jwt = jwt.jwt;
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
    encoded_jwt(state) {
      return state.jwt;
    }
  }
});
