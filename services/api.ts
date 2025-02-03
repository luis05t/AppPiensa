import axios from "axios";
import { secureStorage } from "./SecureStore/secureStoreService";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await secureStorage.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.accessToken) {
      secureStorage.setToken(response.data.accessToken);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await secureStorage.removeToken();
    }
    return Promise.reject(error);
  }
);

export default api;
