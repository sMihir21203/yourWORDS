import axios from "axios";

export const API = axios.create({
  baseURL: "/api/v1/user", // No need for localhost due to proxy
  withCredentials: true, // Ensures cookies are sent
});


