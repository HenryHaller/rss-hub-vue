import apiClient from "./apiClient";
import store from "../store/index";

export default {
  login(credentials) {
    return apiClient.post("/auth/login", credentials);
  },

  logout() {
    return apiClient.delete("/auth/logout");
  },

  register(credentials) {
    return apiClient.post("/signup", credentials);
  },

  requestRecovery(credentials) {
    return apiClient.post("/auth/password_recovery_request", credentials);
  },

  attemptRecovery(credentials) {
    return apiClient.post("/auth/password_recovery_attempt", credentials);
  },

  updatePassword(credentials) {
    return apiClient.post("/auth/update_password", credentials);
  },

  activateAccount(credentials) {
    return apiClient.post("/auth/activate", credentials);
  }
};
