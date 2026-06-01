import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);
