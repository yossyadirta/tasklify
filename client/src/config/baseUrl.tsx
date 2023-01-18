import axios from "axios";

const instance = axios.create({
  baseURL: "https://tasklify-server-production-production.up.railway.app",
});

export default instance;
