import axios from "axios";

const api = axios.create({
  // baseURL: "https://webhook.site/112276fe-3b24-47d2-9e12-c279bf821562",
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
