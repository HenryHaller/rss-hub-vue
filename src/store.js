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
    SET_EPISODES(state, episodes) {
      state.episodes = episodes;
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
    },
    setEpisodes({ commit }, episodes) {
      // let localEpisodes = localStorage.getItem("episodes");
      // if (localEpisodes === null) {
      //   localEpisodes = [];
      // }
      // episodes = episodes.concat(localEpisodes);
      // if (episodes.length > 20) {
      //   episodes = episodes.slice(0, 19);
      // }

      // localStorage.setItem("episodes", episodes);
      commit("SET_EPISODES", episodes);
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
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
    },
    episodes(state) {
      return state.episodes;
    }
  }
});
