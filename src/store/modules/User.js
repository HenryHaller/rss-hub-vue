export default {
  namespaced: true,
  getters: {
    decoded_jwt() {
      let token = localStorage.getItem("jwt");
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    }
  }
};
