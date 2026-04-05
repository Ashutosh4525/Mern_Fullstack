import { API } from "./api";

export const getAllContent = async (params = {}) => {
  const res = await API.get("/content/all", { params });
  return res.data;
};

export const getContentById = async (id) => {
  const res = await API.get(`/content/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await API.get("/category/all");
  return res.data;
};

export const getContentCast = async (contentId) => {
  const res = await API.get(`/movie-Cast/${contentId}`);
  return res.data;
};
