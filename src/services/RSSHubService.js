import apiClient from "./apiClient";
import store from "../store/index";

export default {
  getEpisodes() {
    apiClient.defaults.headers.common["Authorization"] =
      store.getters["User/jwt"];
    return apiClient.get("/episodes");
  },
  getShows() {
    apiClient.defaults.headers.common["Authorization"] =
      store.getters["User/jwt"];
    return apiClient.get("/shows");
  },
  subscribe(input) {
    apiClient.defaults.headers.common["Authorization"] =
      store.getters["User/jwt"];
    return apiClient.post("/shows", input);
  },
  unSubscribe(show_id) {
    apiClient.defaults.headers.common["Authorization"] =
      store.getters["User/jwt"];
    return apiClient.delete(`/shows/${show_id}`);
  }

  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
