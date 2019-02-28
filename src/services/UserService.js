import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://api-dev.rsshub.online`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  login(credentials) {
    return apiClient.post("/auth/login", credentials);
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
    return apiClient.post("/signup", credentials);
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
