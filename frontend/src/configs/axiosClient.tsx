import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getTokenFromCookies } from "../utils";

interface ErrorResponse {
  message: string;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${getTokenFromCookies()}`,
  },
});

export default axiosClient;
