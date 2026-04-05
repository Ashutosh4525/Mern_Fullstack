import { API } from "./api";

export const getAllCast = async () => {
  const res = await API.get("/cast/all?limit=100");
  return res.data;
};

export const getContentCast = async (contentId) => {
  const res = await API.get(`/movie-Cast/content/${contentId}`);
  return res.data;
};
