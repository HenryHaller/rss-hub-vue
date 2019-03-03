import axios from "axios";
import store from "../store";
import router from "../router";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

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

    // .then(response => {
    //   console.log(response.data);
    //   const auth_token = response.data.auth_token;
    //   store.commit("SET_JWT", auth_token);
    // })
    // .catch(err => {
    //   console.log("Your Error is" + err.message);
    // });
  },
  register(credentials) {
    apiClient.post("/signup", credentials).then(response => {
      if (response.data.auth_token) {
        store.dispatch("setJWT", { jwt: response.data.auth_token });
        router.push({ name: "Episodes" });
      }
    });
  }
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(err => {
  //       console.log("Your Error is" + err.message);
  //     });
  // }
  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
