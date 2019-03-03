import apiClient from "./apiClient";
import store from "../store";
import router from "../router";

export default {
  login(credentials) {
    apiClient
      .post("/auth/login", credentials)
      .then(response => {
        if (response.data.auth_token) {
          store.dispatch("setJWT", { jwt: response.data.auth_token });
          router.push({ name: "Episodes" });
        }
      })
      .catch(err => {
        console.log("Your error was: " + err);
      });
  },
  register(credentials) {
    apiClient.post("/signup", credentials).then(response => {
      console.log(response);
      if (response.data.auth_token) {
        store.dispatch("setJWT", { jwt: response.data.auth_token });
        router.push({ name: "Episodes" });
      }
    });
  }
};
