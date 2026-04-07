import { API } from "./api";

export const getCurrentUser = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await API.post("/users/login", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/users/logout");
  return res.data;
};

export const registerUser = async (payload) => {
  const formData = new FormData();
  formData.append("firstname", payload.firstname);
  formData.append("lastname", payload.lastname);
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const res = await API.post("/users/sign-up", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};

export const forgotPassword = async (payload) => {
  const res = await API.post("/users/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (payload) => {
  const res = await API.post("/users/reset-password", payload);
  return res.data;
};

export const sendOtpForPasswordChange = async () => {
  const res = await API.post("/users/send-otp-password-change");
  return res.data;
};

export const verifyOtpChangePassword = async (payload) => {
  const res = await API.post("/users/verify-otp-change-password", payload);
  return res.data;
};

export const updateUser = async (payload) => {
  const formData = new FormData();
  if (payload.firstname) formData.append("firstname", payload.firstname);
  if (payload.lastname) formData.append("lastname", payload.lastname);
  if (payload.email) formData.append("email", payload.email);

  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const res = await API.put("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};

export const changeCurrentPassword = async (payload) => {
  const res = await API.post("/users/change-password", payload);
  return res.data;
};
