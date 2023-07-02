import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ErrorResponse {
  message: string;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data, status } = error.response as AxiosResponse<ErrorResponse>;
    if (
      (status === 401 || status === 403) &&
      data.message === "Unauthorized or Access Token is expired"
    ) {
      axiosClient.defaults.headers.common["x-access-token"] =
        localStorage.getItem("x-access-token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
