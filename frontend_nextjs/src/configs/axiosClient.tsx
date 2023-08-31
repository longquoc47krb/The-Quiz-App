/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const axiosClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};

const axiosClient: AxiosInstance = axios.create(axiosClientConfig);

// Set default headers
axiosClient.defaults.headers.common['Content-Type'] = 'application/json';
axiosClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Add an Axios interceptor to dynamically update Authorization header
axiosClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken') || '';
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
export const clearAuthentication = () => {
  // Clear access token from cookies
  Cookies.remove('accessToken');

  // Reset Axios Authorization header
  axiosClient.defaults.headers.common.Authorization = '';

  // Perform any other necessary cleanup or state reset
};
export default axiosClient;
