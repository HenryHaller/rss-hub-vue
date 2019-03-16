import RSSHubService from "../../services/RSSHubService";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    episodes: [],
    shows: [],
    updating: false
  },
  mutations: {
    UPDATING(state) {
      state.updating = true;
    },
    NOT_UPDATING(state) {
      state.updating = false;
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
    updating({ commit }) {
      commit("UPDATING");
    },
    notUpdating({ commit }) {
      commit("NOT_UPDATING");
    },
    fetchEpisodes({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        RSSHubService.getEpisodes()
          .then(response => {
            commit("SET_EPISODES", response.data);
            resolve();
          })
          .catch(err => {
            console.log("error in fetching episodes: " + err);
            if (err.response.data.message == "Signature has expired") {
              const update_interval_key = localStorage.getItem(
                "update_interval_key"
              );
              clearInterval(update_interval_key);
              localStorage.clear();
              router.push({ name: "Login" });
            }
          });
      });
    },

    fetchShows({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        RSSHubService.getShows().then(response => {
          commit("SET_SHOWS", response.data);
          resolve();
        });
      });
    },

    deleteShow({ commit }, show_id) {
      return new Promise((resolve, reject) => {
        RSSHubService.unSubscribe(show_id).then(response => {
          commit("SET_EPISODES", response.data);
          commit("DELETE_SHOW", show_id);
          resolve();
        });
      });
    },

    subscribeShow({ commit, dispatch }, { input, flash }) {
      return new Promise((resolve, reject) => {
        RSSHubService.subscribe(input)
          .then(() => {
            dispatch("fetchShows");
            dispatch("fetchEpisodes");
            resolve();
          })
          .catch(err => {
            flash("Subscribing Error", "error", {
              timeout: 2000
            });
            dispatch("notUpdating");
            console.log(
              "error in subscribing to a show " + err + input.rss_url
            );
          });
      });
    },
    setEpisodes({ commit }, episodes) {
      commit("SET_EPISODES", episodes);
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
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
    },
    hasShows(state) {
      if (state.shows.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    updating(state) {
      return state.updating;
    }
  }
};
