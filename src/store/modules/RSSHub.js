import RSSHubService from "../../services/RSSHubService";

export default {
  namespaced: true,
  state: {
    episodes: [],
    shows: []
  },
  mutations: {
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
    fetchEpisodes({ commit }) {
      return new Promise((resolve, reject) => {
        RSSHubService.getEpisodes().then(response => {
          commit("SET_EPISODES", response.data);
          resolve();
        });
      });
    },
    setEpisodes({ commit }, episodes) {
      commit("SET_EPISODES", episodes);
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
    },
    deleteShow({ commit }, show_id) {
      commit("DELETE_SHOW", show_id);
      commit("DELETE_EPISODES_BY_SHOW_ID", show_id);
    },
    appendShow({ commit, state }, show) {
      const shows = state.shows.append(show);
      commit("SET_SHOWS", shows);
    }
  },
  getters: {
    episodes(state) {
      return state.episodes;
    },
    shows(state) {
      return state.shows;
    }
  }
};
