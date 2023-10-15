import axios from "axios";

const baseURL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
