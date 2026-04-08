import { API } from './api';

export const loginAdmin = async (payload) => {
  await API.post('/users/login', payload);
  const response = await API.get('/users/me');
  const user = response.data?.data;

  if (!user || user.role !== 'admin') {
    await API.post('/users/logout');
    throw new Error('You do not have admin privileges');
  }

  return user;
};

export const registerAdminCandidate = async (payload) => {
  const formData = new FormData();
  formData.append('firstname', payload.firstname);
  formData.append('lastname', payload.lastname);
  formData.append('email', payload.email);
  formData.append('password', payload.password);

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  const response = await API.post('/users/sign-up', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const forgotPassword = async (payload) => {
  const response = await API.post('/users/forgot-password', payload);
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await API.post('/users/reset-password', payload);
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await API.get('/users/me');
  return response.data?.data;
};

export const updateCurrentAdmin = async (payload) => {
  const formData = new FormData();
  formData.append('firstname', payload.firstname);
  formData.append('lastname', payload.lastname);
  formData.append('email', payload.email);

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  const response = await API.put('/users/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data;
};

export const changeCurrentPassword = async (payload) => {
  const response = await API.post('/users/change-password', payload);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await API.post('/users/logout');
  return response.data;
};
