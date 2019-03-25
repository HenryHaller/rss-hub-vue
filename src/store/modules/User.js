export default {
  namespaced: true,
  state: {
    jwt: ""
  },
  mutations: {
    SET_JWT(state, jwt) {
      state.jwt = jwt;
    },
    CLEAR_JWT(state) {
      state.jwt = "";
    }
  },
  actions: {
    setJWT({ commit }, jwt) {
      commit("SET_JWT", jwt);
    },
    clearJWT({ commit }) {
      commit("CLEAR_JWT");
    }
  },
  getters: {
    jwt(state) {
      return state.jwt;
    },
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
