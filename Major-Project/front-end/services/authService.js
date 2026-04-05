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
