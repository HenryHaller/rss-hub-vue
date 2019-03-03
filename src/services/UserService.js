import apiClient from "./apiClient";
import router from "../router";

export default {
  login(credentials) {
    apiClient
      .post("/auth/login", credentials)
      .then(response => {
        if (response.data.auth_token) {
          localStorage.setItem("jwt", response.data.auth_token);
          router.push({ name: "Episodes" });
        }
      })
      .catch(err => {
        console.log("Your error was: " + err);
      });
  },
  register(credentials) {
    apiClient
      .post("/signup", credentials)
      .then(response => {
        if (response.data.auth_token) {
          localStorage.setItem("jwt", response.data.auth_token);
          router.push({ name: "Episodes" });
        }
      })
      .catch(err => {
        console.log("Your error was: " + err);
      });
  }
};
