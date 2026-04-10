import axios from 'axios';

export const API_URL = "https://movie-app-4nje.onrender.com/api/v1";

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${API_URL}/users/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        return API(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
