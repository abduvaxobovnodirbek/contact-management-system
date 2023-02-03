import Cookies from "universal-cookie";
import axios from "axios";
export const API_URL = process.env.REACT_APP_BASE_URL;

const cookies = new Cookies();

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config: any) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${cookies.get("token")}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
