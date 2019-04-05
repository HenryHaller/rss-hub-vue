import RSSHubService from "../../services/RSSHubService";
import router from "@/router";
import { mapActions } from "vuex";

export default {
  namespaced: true,
  state: {
    episodes: {},
    feed: [],
    shows: [],
    updating: false,
    lastModified: "",
    updateIntervalKey: ""
  },
  mutations: {
    UPDATING(state) {
      state.updating = true;
    },
    NOT_UPDATING(state) {
      state.updating = false;
    },
    RESET(state) {
      state.shows = [];
      state.episodes = {};
      state.feed = [];
    },
    MERGE_EPISODES(state, episodes, showId) {
      const merge = (a1, a2) => {
        const a3 = a1.concat(a2);
        let result = [];
        const map = new Map();
        for (const item of a3) {
          if (!map.has(item.id)) {
            map.set(item.id, true);
            result.push(item);
          }
        }
        result = result.sort((a, b) => {
          return new Date(a.pub_date) > new Date(b.pub_date);
        });
        return result;
      };
      if (showId === undefined) {
        state.feed = merge(state.feed, episodes);
      } else {
        if (state.episodes[showId] === undefined) state.episodes[showId] = [];
        state.episodes[showId] = merge(state.episodes[showId], episodes);
      }
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
    DELETE_EPISODES_BY_SHOW_ID(state, showId) {
      let episodes = state.episodes;
      delete episodes[showId];
      state.episodes = episodes;
      state.feed = state.feed.filter(episode => episode.show_id !== showId);
    }
  },
  actions: {
    updating({ commit }) {
      commit("UPDATING");
    },
    notUpdating({ commit }) {
      commit("NOT_UPDATING");
    },
    fetchShowEpisodes({ commit, dispatch }, { id, page }) {
      if (id === undefined) {
        return new Promise((resolve, reject) => {
          RSSHubService.getEpisodes(page)
            .then(response => {
              commit("MERGE_EPISODES", response.data, id);
              resolve();
            })
            .catch(err => {
              console.log("error in fetching episodes: " + err);
              if (err.response.data.message == "Signature has expired") {
                router.push({ name: "Login" });
              }
            })
            .finally(() => {
              dispatch("notUpdating");
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          RSSHubService.getShowEpisodes(id, page)
            .then(response => {
              commit("MERGE_EPISODES", response.data, id);
              resolve();
            })
            .catch(err => {
              console.log("error in fetching episodes: " + err);
              if (err.response.data.message == "Signature has expired") {
                router.push({ name: "Login" });
              }
            })
            .finally(() => {
              dispatch("notUpdating");
            });
        });
      }
    },

    fetchShows({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        RSSHubService.getShows().then(response => {
          commit("SET_SHOWS", response.data);
          resolve();
        });
      });
    },

    deleteShow({ commit, dispatch, state }, show_id) {
      dispatch("updating");
      commit("DELETE_SHOW", show_id);
      commit("DELETE_EPISODES_BY_SHOW_ID", show_id);

      return new Promise((resolve, reject) => {
        RSSHubService.unSubscribe(show_id).then(response => {
          // commit("SET_EPISODES", response.data);
          if (state.feed.length < 25)
            dispatch("fetchShowEpisodes", { page: 1 });
          resolve();
        });
      });
    },

    subscribeShow({ commit, dispatch }, { input, flash }) {
      return new Promise((resolve, reject) => {
        dispatch("updating");
        RSSHubService.subscribe(input)
          .then(response => {
            dispatch("clearEverything");
            dispatch("fetchShowEpisodes", { page: 1, showId: undefined });
            dispatch("fetchShows");
            dispatch("notUpdating");
            resolve();
          })
          .catch(err => {
            dispatch("notUpdating");
            console.log(
              "error in subscribing to a show " + err + input.rss_url
            );
          });
      });
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
    },
    appendShow({ commit, state }, show) {
      const shows = state.shows.append(show);
      commit("SET_SHOWS", shows);
    },
    clearEverything({ commit }) {
      commit("RESET");
    }
  },
  getters: {
    episodes: state => showId => {
      if (showId === undefined) {
        return state.feed;
      } else {
        return state.episodes[showId];
      }
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
