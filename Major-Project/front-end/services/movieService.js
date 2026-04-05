import { API } from "./api";

export const getMovies = async () => {
  const res = await API.get("/content/all");
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await API.get(`/movie/get/${id}`);
  return res.data;
};