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
  login(credentials) {
    apiClient
      .post("/auth/login", credentials)
      .then(response => {
        console.log(response.data);
        const auth_token = response.data.auth_token;
        store.commit("SET_JWT", auth_token);
      })
      .catch(err => {
        console.log("Your Error is" + err.message);
      });
  }
  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
};
