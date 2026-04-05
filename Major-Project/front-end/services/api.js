import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:8000/api/v1";

export const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});
