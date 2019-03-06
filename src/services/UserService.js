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
    apiClient.post("/signup", credentials);
  },

  requestRecovery(credentials) {
    return apiClient.post("/auth/password_recovery_request", credentials);
  },

  attemptRecovery(credentials) {
    return apiClient.post("/auth/password_recovery_attempt", credentials);
  },

  updatePassword(credentials) {
    apiClient.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwt"
    );
    return apiClient.post("/auth/update_password", credentials);
  },

  activateAccount(credentials) {
    return apiClient.post("/auth/activate", credentials);
  }
};
