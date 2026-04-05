import { API } from "./api";

export const getUserRentals = async (userId) => {
  const res = await API.get(`/rental/user/${userId}`);
  return res.data;
};
