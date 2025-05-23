import axios from "axios";
const API_URL = "https://localhost:7227/api";
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Network timeout. Check your internet connection and try again.",
  headers: {
    "Content-Type": "application/json",
  },
});