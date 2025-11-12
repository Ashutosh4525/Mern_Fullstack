import axios from 'axios';

const axiosNew=axios.create({
    baseURL:"https://6904a8d46b8dabde496499d6.mockapi.io/session9/"
});

axiosNew.interceptors.request.use(
  (config) => {
    // sessionStorage.setItem("token", "skdjsidsjdkj");
    var token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosNew;
