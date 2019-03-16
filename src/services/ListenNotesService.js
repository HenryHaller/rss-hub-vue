import axios from "axios";

let lnClient = axios.create({
  baseURL: "https://api.listennotes.com",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "ncsT9Nzsqemshj2dUedsjbwVbagNp1qak2AjsnVZDz45EJIarO"
  }
});

const encodeOBJ = obj => {
  let str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
};

export default {
  typeAhead(params) {
    return lnClient.get("/api/v1/typeahead?" + encodeOBJ(params));
  },
  search(params) {
    return lnClient.get("/api/v1/search?" + encodeOBJ(params));
  },
  podcastLookup(id) {
    return lnClient.get(`/api/v1/podcasts/${id}`);
  }
};
