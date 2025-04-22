import axios from "axios";
import Config from "@/config";

// Create an axios instance
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000, //5s
});
// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
    newConfig.headers.accept = "application/json";
    return newConfig;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;