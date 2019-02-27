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
    },

    DELETE_SHOW(state, show_id) {
      //matching values will get returned
      state.shows = state.shows.filter(function(value, index, array) {
        return value.id !== show_id;
      });
    },

    DELETE_EPISODES_BY_SHOW_ID(state, show_id) {
      state.episodes = state.episodes.filter(function(value, index, array) {
        return value.show_id !== show_id;
      });
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
    },
    deleteShow({ commit }, show_id) {
      commit("DELETE_SHOW", show_id);
      commit("DELETE_EPISODES_BY_SHOW_ID", show_id);
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
    },
    shows(state) {
      return state.shows;
    }
  }
});
