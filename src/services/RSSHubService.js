import apiClient from "./apiClient";

export default {
  getEpisodes() {
    apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    return apiClient.get("/episodes");
  },
  getShows() {
    apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    return apiClient.get("/shows");
  },
  subscribe(input) {
    apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    return apiClient.post("/shows", input);
  },
  unSubscribe(show_id) {
    apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    return apiClient.delete(`/shows/${show_id}`);
  }

  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
