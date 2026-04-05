import { API } from "./api";

export const createPaymentOrder = async (contentId) => {
  const res = await API.post("/payment/order", { contentId });
  return res.data;
};

export const verifyPayment = async (payload) => {
  const res = await API.post("/payment/verify", payload);
  return res.data;
};
