import axios from "axios";

let apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER,
  withCredentials: true, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default apiClient;
