export default {
  namespaced: true,
  state: {
    jwt: ""
  },
  mustations: {
    SET_JWT(state, jwt) {
      state.jwt = jwt;
    },
    CLEAR_JWT(state) {
      state.jwt = "";
    }
  },
  actions: {
    setJWT({ commit }, jwt) {
      jwt = jwt.jwt;
      localStorage.setItem("jwt", jwt);
      commit("SET_JWT", jwt);
    },
    clearJWT({ commit }) {
      localStorage.removeItem("jwt");
      commit("CLEAR_JWT");
    }
  },

  getters: {
    has_jwt(state) {
      if (state["jwt"].length > 0) {
        return true;
      } else {
        return false;
      }
    },
    encoded_jwt(state) {
      return state.jwt;
    }
  }
};
