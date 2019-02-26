import axios from "axios";
import store from "../store";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getEpisodes() {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.raw_jwt;
      return apiClient.get("/episodes");
    } else {
      return [];
    }
  },
  getShows() {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.raw_jwt;
      return apiClient.get("/shows");
    }
  },
  subscribe(input) {
    if (store.getters.has_jwt) {
      apiClient.defaults.headers.common["Authorization"] =
        store.getters.raw_jwt;
      return apiClient.post("/shows", input);
    } else {
      return false;
    }
  }
  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
