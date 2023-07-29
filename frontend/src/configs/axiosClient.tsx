import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

export default axiosClient;
