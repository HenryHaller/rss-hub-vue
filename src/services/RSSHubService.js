import apiClient from "./apiClient";

export default {
  getEpisodes() {
    if (localStorage.getItem("jwt")) {
      apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwt"
      );
      return apiClient.get("/episodes");
    } else {
      return [];
    }
  },
  getShows() {
    if (localStorage.getItem("jwt")) {
      apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwt"
      );
      return apiClient.get("/shows");
    }
  },
  subscribe(input) {
    if (localStorage.getItem("jwt")) {
      apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwt"
      );
      return apiClient.post("/shows", input);
    } else {
      return false;
    }
  },
  unSubscribe(show_id) {
    if (localStorage.getItem("jwt")) {
      apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwt"
      );
      return apiClient.delete(`/shows/${show_id}`);
    } else {
      return false;
    }
  }

  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
