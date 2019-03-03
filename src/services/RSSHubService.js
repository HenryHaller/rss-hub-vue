import apiClient from "./apiClient";
import store from "../store";

export default {
  getEpisodes() {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.encoded_jwt;
      return apiClient.get("/episodes");
    } else {
      return [];
    }
  },
  getShows() {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.encoded_jwt;
      return apiClient.get("/shows");
    }
  },
  subscribe(input) {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.encoded_jwt;
      return apiClient.post("/shows", input);
    } else {
      return false;
    }
  },
  unSubscribe(show_id) {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.encoded_jwt;
      return apiClient.delete(`/shows/${show_id}`);
    } else {
      return false;
    }
  }

  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
