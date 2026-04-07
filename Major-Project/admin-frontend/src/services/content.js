import { API } from './api';

export const getAllContent = async (params = {}) => {
  const response = await API.get('/content/all', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await API.get('/category/all');
  return response.data;
};
