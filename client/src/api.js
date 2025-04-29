

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your API base URL
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token") || sessionStorage.removeItem("token");
      window.location.reload(true);
    }
    return Promise.reject(error);
  }
);

export default api;
