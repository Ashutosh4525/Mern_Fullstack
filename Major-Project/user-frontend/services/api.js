import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "https://movie-app-4nje.onrender.com/api/v1";

export const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});
