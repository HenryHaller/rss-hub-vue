import apiClient from "./apiClient";

export default {
  login(credentials) {
    return apiClient.post("/auth/login", credentials);
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
