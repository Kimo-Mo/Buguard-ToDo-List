import axios from "axios";

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data);
    return Promise.reject(error);
  }
);

ApiClient.interceptors.request.use((config) => {
  return config;
});
